export interface NavItem {
  label: string;
  href: string;
}

export interface BambooLayer {
  number: string;
  code: string;
  name: string;
  question: string;
  description: string;
  deliverables: string[];
  tag: string;
}

export interface SolutionTrack {
  id: string;
  code: string;
  stage: string;
  title: string;
  forWhom: string;
  outcome: string;
  ctaText: string;
  scopeList?: string[];
}

export interface CareerMilestone {
  stage: string;
  title: string;
  description: string;
}

export interface VerifiedProofItem {
  id: string;
  statement: string;
  detail: string;
  category: 'Partnership' | 'Reach' | 'Community' | 'Mentoring' | 'Creation';
}

export type FeedbackMediaType = 'image' | 'video';

export interface FeedbackItem {
  id: string;
  type: FeedbackMediaType;
  title?: string;
  author?: string;
  role?: string;
  tag?: string;
  content?: string;
  mediaUrl: string; // Base64, local path (/assets/...), or video URL (YouTube, Vimeo, MP4)
  videoEmbedUrl?: string;
  date?: string;
  rating?: number;
  highlight?: boolean;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  hasWhat: string;
  problem: string;
  solution: string;
  assetCreated: string[];
  result: string;
  proofMedia?: {
    type: FeedbackMediaType;
    url: string;
    caption: string;
    embedUrl?: string;
  };
}
