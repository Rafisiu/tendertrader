import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfileWizard } from '@/hooks/useProfileWizard';
import StepIndicator from '@/components/profile-perusahaan/shared/StepIndicator';
import WizardNavigation from '@/components/profile-perusahaan/shared/WizardNavigation';

// Import all step components
import DataPerusahaanStep from '@/components/profile-perusahaan/steps/DataPerusahaan';
import OrganisasiStep from '@/components/profile-perusahaan/steps/Organisasi';
import DokumenStep from '@/components/profile-perusahaan/steps/Dokumen';
import BankStep from '@/components/profile-perusahaan/steps/Bank';
import BidangUsahaStep from '@/components/profile-perusahaan/steps/BidangUsaha';
import TenagaAhliStep from '@/components/profile-perusahaan/steps/TenagaAhli';
import PengalamanStep from '@/components/profile-perusahaan/steps/Pengalaman';
import MitraKerjaStep from '@/components/profile-perusahaan/steps/MitraKerja';
import LaporanKeuanganStep from '@/components/profile-perusahaan/steps/LaporanKeuangan';
import PemasaranStep from '@/components/profile-perusahaan/steps/Pemasaran';
import RepresentatifStep from '@/components/profile-perusahaan/steps/Representatif';
import StatusAktivitasStep from '@/components/profile-perusahaan/steps/StatusAktivitas';

const ProfilePerusahaan = () => {
  const {
    currentStep,
    steps,
    wizardData,
    setWizardData,
    goToNext,
    goToPrevious,
    goToStep,
    saveDraft,
    submitProfile,
    loadDraft,
    isFirstStep,
    isLastStep,
    activeTabValue,
    setActiveTabValue
  } = useProfileWizard();

  // Load draft on component mount
  React.useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  const renderStepContent = (tabValue: string) => {
    const stepProps = {
      data: wizardData,
      setData: setWizardData
    };

    switch (tabValue) {
      case 'data-perusahaan':
        return <DataPerusahaanStep {...stepProps} />;
      case 'organisasi-perusahaan':
        return <OrganisasiStep {...stepProps} />;
      case 'dokumen':
        return <DokumenStep {...stepProps} />;
      case 'bank':
        return <BankStep {...stepProps} />;
      case 'bidang-usaha':
        return <BidangUsahaStep {...stepProps} />;
      case 'tenaga-ahli':
        return <TenagaAhliStep {...stepProps} />;
      case 'pengalaman':
        return <PengalamanStep {...stepProps} />;
      case 'mitra-kerja':
        return <MitraKerjaStep {...stepProps} />;
      case 'laporan-keuangan':
        return <LaporanKeuanganStep {...stepProps} />;
      case 'pemasaran':
        return <PemasaranStep {...stepProps} />;
      case 'representatif':
        return <RepresentatifStep {...stepProps} />;
      case 'status-aktivitas':
        return <StatusAktivitasStep {...stepProps} />;
      default:
        return <DataPerusahaanStep {...stepProps} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Profile Perusahaan</h1>
            <div className="bg-[#eddcb5] p-4 rounded-lg">
              <p className="text-muted-foreground">
                Lengkapi profil perusahaan Anda dalam 12 langkah untuk dapat mengikuti tender dan mengelola produk.
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator 
              steps={steps} 
              currentStep={currentStep}
              onStepClick={(stepId) => {
                goToStep(stepId);
                // Update active tab based on step
                const tabValue = getTabValueByStep(stepId);
                setActiveTabValue(tabValue);
              }}
            />
          </div>

          <div className="mb-8">
            <Tabs value={activeTabValue} onValueChange={(value) => {
              setActiveTabValue(value);
              // Update current step based on tab
              const stepId = getStepByTabValue(value);
              if (stepId !== currentStep) {
                goToStep(stepId);
              }
            }}>
              {/* <TabsList className="mb-6 flex flex-wrap h-auto gap-1 p-1 bg-muted rounded-md">
                <TabsTrigger value="data-perusahaan">Data Perusahaan</TabsTrigger>
                <TabsTrigger value="organisasi-perusahaan">Organisasi Perusahaan</TabsTrigger>
                <TabsTrigger value="bank">Bank</TabsTrigger>
                <TabsTrigger value="bidang-usaha">Bidang Usaha</TabsTrigger>
                <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
                <TabsTrigger value="tenaga-ahli">Tenaga Ahli & Peralatan</TabsTrigger>
                <TabsTrigger value="pengalaman">Pengalaman</TabsTrigger>
                <TabsTrigger value="mitra-kerja">Mitra Kerja</TabsTrigger>
                <TabsTrigger value="laporan-keuangan">Laporan Keuangan</TabsTrigger>
                <TabsTrigger value="pemasaran">Pemasaran</TabsTrigger>
                <TabsTrigger value="representatif">Perusahaan Representatif</TabsTrigger>
                <TabsTrigger value="status-aktivitas">Status Aktivitas</TabsTrigger>
              </TabsList> */}

              {/* Tab Contents */}
              <TabsContent value="data-perusahaan">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('data-perusahaan')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="organisasi-perusahaan">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('organisasi-perusahaan')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="bank">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('bank')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="bidang-usaha">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('bidang-usaha')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="dokumen">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('dokumen')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="tenaga-ahli">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('tenaga-ahli')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pengalaman">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('pengalaman')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="mitra-kerja">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('mitra-kerja')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="laporan-keuangan">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('laporan-keuangan')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pemasaran">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('pemasaran')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="representatif">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('representatif')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="status-aktivitas">
                <div className="bg-white rounded-lg border p-6">
                  {renderStepContent('status-aktivitas')}
                  <WizardNavigation
                    currentStep={currentStep}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    onSaveDraft={saveDraft}
                    onSubmit={submitProfile}
                  />
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper functions to map between tabs and steps
const getTabValueByStep = (stepId: number): string => {
  const tabMapping = [
    'data-perusahaan',
    'organisasi-perusahaan', 
    'bank',
    'bidang-usaha',
    'dokumen',
    'tenaga-ahli',
    'pengalaman',
    'mitra-kerja',
    'laporan-keuangan',
    'pemasaran',
    'representatif',
    'status-aktivitas'
  ];
  return tabMapping[stepId - 1] || 'data-perusahaan';
};

const getStepByTabValue = (tabValue: string): number => {
  const stepMapping: { [key: string]: number } = {
    'data-perusahaan': 1,
    'organisasi-perusahaan': 2,
    'bank': 3,
    'bidang-usaha': 4,
    'dokumen': 5,
    'tenaga-ahli': 6,
    'pengalaman': 7,
    'mitra-kerja': 8,
    'laporan-keuangan': 9,
    'pemasaran': 10,
    'representatif': 11,
    'status-aktivitas': 12
  };
  return stepMapping[tabValue] || 1;
};

export default ProfilePerusahaan;