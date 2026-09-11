/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BigIdea } from './components/BigIdea';
import { Problem } from './components/Problem';
import { Transformation } from './components/Transformation';
import { BambooAssetization } from './components/BambooAssetization';
import { AiAsLeverage } from './components/AiAsLeverage';
import { AboutMai } from './components/AboutMai';
import { ProofResults } from './components/ProofResults';
import { WaysToWork } from './components/WaysToWork';
import { CaseStudies } from './components/CaseStudies';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ZaloFloatingWidget } from './components/ZaloFloatingWidget';
import { AdminModal } from './components/AdminModal';
import { AdminFloatingBar } from './components/AdminFloatingBar';
import { AddFeedbackModal } from './components/AddFeedbackModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string | undefined>(undefined);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [addFeedbackModalOpen, setAddFeedbackModalOpen] = useState(false);

  const handleOpenContact = (stage?: string) => {
    setSelectedStage(stage);
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE0] text-[#3D2F1F] font-sans selection:bg-[#4A7C59] selection:text-white relative">
      {/* Navigation Header */}
      <Header onOpenContact={handleOpenContact} />

      <main>
        {/* 02. Hero Section */}
        <Hero onOpenContact={handleOpenContact} />

        {/* 03. Big Idea / Belief */}
        <BigIdea />

        {/* 04. Problem Section */}
        <Problem />

        {/* 05. Transformation Section */}
        <Transformation />

        {/* 06. Bamboo Assetization™ (Signature Method) */}
        <BambooAssetization />

        {/* 07. AI as Leverage */}
        <AiAsLeverage />

        {/* 08. About Mai Section */}
        <AboutMai />

        {/* 09. Proof / Results Section */}
        <ProofResults onOpenDashboard={() => setAdminDashboardOpen(true)} />

        {/* 10. Ways to Work With Mai */}
        <WaysToWork onOpenContact={handleOpenContact} />

        {/* 11. Case Studies Section */}
        <CaseStudies />

        {/* 12. Final CTA Section */}
        <FinalCta onOpenContact={handleOpenContact} />
      </main>

      {/* 13. Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Interactive Consultation Request Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={handleCloseContact}
        defaultStage={selectedStage}
      />

      {/* Floating Zalo Quick Access Widget */}
      <ZaloFloatingWidget />

      {/* Admin Quick Floating Bar (Only appears when Admin is authenticated) */}
      <AdminFloatingBar
        onOpenAddFeedback={() => setAddFeedbackModalOpen(true)}
        onOpenDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Admin Passcode Login Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onSuccess={() => {
          setAdminDashboardOpen(true);
        }}
      />

      {/* Global Add Feedback Modal triggered from Admin Floating Bar */}
      <AddFeedbackModal
        isOpen={addFeedbackModalOpen}
        onClose={() => setAddFeedbackModalOpen(false)}
      />

      {/* Comprehensive Admin Control Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onOpenAddFeedbackModal={() => setAddFeedbackModalOpen(true)}
      />
    </div>
  );
}

