/**
 * Client Consultation Leads Manager
 * Stores and manages customer inquiries submitted via ContactModal
 * Persists to server disk (/api/leads) and IndexedDB/LocalStorage
 */

export interface ConsultationLead {
  id: string;
  name: string;
  contact: string; // phone or zalo
  domain?: string; // industry / field
  stage: string;   // solution interested in
  note?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed';
}

const LEADS_STORAGE_KEY = 'mai_nguyen_consultation_leads_v1';

// In-memory cache
let leadsCache: ConsultationLead[] | null = null;

export function getStoredLeads(): ConsultationLead[] {
  if (leadsCache !== null) return leadsCache;
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        leadsCache = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore error
  }

  leadsCache = [];
  return [];
}

export async function syncLeadsFromServer(): Promise<ConsultationLead[]> {
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const serverLeads = await res.json();
      if (Array.isArray(serverLeads)) {
        leadsCache = serverLeads;
        try {
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(serverLeads));
        } catch {
          // ignore
        }
        window.dispatchEvent(new CustomEvent('mai-leads-updated', { detail: { leads: serverLeads } }));
        return serverLeads;
      }
    }
  } catch {
    // Fall back to local
  }
  return getStoredLeads();
}

async function saveLeads(leads: ConsultationLead[]): Promise<void> {
  leadsCache = leads;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('mai-leads-updated', { detail: { leads } }));
  }

  // Push to server
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leads),
    });
  } catch {
    // ignore
  }
}

export async function addLead(
  lead: Omit<ConsultationLead, 'id' | 'createdAt' | 'status'>
): Promise<ConsultationLead> {
  const current = getStoredLeads();
  const newLead: ConsultationLead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    status: 'new',
  };

  const updated = [newLead, ...current];
  await saveLeads(updated);
  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: ConsultationLead['status']
): Promise<void> {
  const current = getStoredLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  await saveLeads(updated);
}

export async function deleteLead(id: string): Promise<void> {
  const current = getStoredLeads();
  const updated = current.filter((lead) => lead.id !== id);
  await saveLeads(updated);
}

export async function clearAllLeads(): Promise<void> {
  await saveLeads([]);
}
