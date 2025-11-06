import { useState, useCallback } from "react";
import { WizardData, WizardStep } from "@/types/wizard";

const INITIAL_STEPS: WizardStep[] = [
  {
    id: 1,
    title: "Data Perusahaan",
    description: "Informasi dasar perusahaan",
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: "Organisasi Perusahaan",
    description: "Struktur organisasi",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: "Bank",
    description: "Informasi perbankan",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 4,
    title: "Bidang Usaha",
    description: "Bidang usaha perusahaan",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 5,
    title: "Dokumen",
    description: "Upload dokumen",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 6,
    title: "Tenaga Ahli",
    description: "SDM dan peralatan",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 7,
    title: "Pengalaman",
    description: "Pengalaman perusahaan",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 8,
    title: "Mitra Kerja",
    description: "Partnership",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 9,
    title: "Laporan Keuangan",
    description: "Financial reports",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 10,
    title: "Pemasaran",
    description: "Marketing strategy",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 11,
    title: "Representatif",
    description: "Perusahaan representatif",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 12,
    title: "Status Aktivitas",
    description: "Status akhir",
    isCompleted: false,
    isActive: false,
  },
];

const INITIAL_WIZARD_DATA: WizardData = {
  // Step 1 - Data Perusahaan
  nomorRegistrasi: "",
  namaPerusahaan: "",
  singkatan: "",
  callName: "",
  npwp: "",
  pkpStatus: "0",
  nomorPkp: "",
  nomorAkta: "",
  terdaftarPada: "",
  emailPerusahaan: "",
  telepon: "",
  kepemilikan: "",
  jenisBadanUsaha: "",
  lokasi: "",
  kualifikasi: "",
  tahunBerdiri: "",
  jumlahKaryawan: "",
  situsWeb: "",
  kategoriProduk: [],
  industri: [],
  kataKunci: "",
  alamatData: [],
  picData: [],
  // Step 2 - Organisasi
  strukturOrganisasi: [],
  // Step 3 - Dokumen
  dokumenData: [],
};

export const useProfileWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<WizardStep[]>(INITIAL_STEPS);
  const [activeTabValue, setActiveTabValue] = useState("data-perusahaan");
  const [wizardData, setWizardData] = useState<WizardData>(INITIAL_WIZARD_DATA);

  const updateSteps = useCallback(
    (stepId: number, updates: Partial<WizardStep>) => {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === stepId ? { ...step, ...updates } : step
        )
      );
    },
    []
  );

  const goToStep = useCallback((stepId: number) => {
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        isActive: step.id === stepId,
      }))
    );
    setCurrentStep(stepId);
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep < 12) {
      updateSteps(currentStep, { isCompleted: true });
      const nextStep = currentStep + 1;
      goToStep(nextStep);
      // Update tab
      setActiveTabValue(getTabValueByStep(nextStep));
    }
  }, [currentStep, updateSteps, goToStep]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      goToStep(prevStep);
      // Update tab
      setActiveTabValue(getTabValueByStep(prevStep));
    }
  }, [currentStep, goToStep]);

  // Save draft function
  const saveDraft = useCallback(async () => {
    try {
      // Save to localStorage
      localStorage.setItem('profile-draft', JSON.stringify(wizardData));
      console.log('Draft saved successfully');
      return { success: true, message: 'Data berhasil disimpan sementara' };
    } catch (error) {
      console.error('Failed to save draft:', error);
      return { success: false, message: 'Gagal menyimpan data' };
    }
  }, [wizardData]);

  // Submit profile function
  const submitProfile = useCallback(async () => {
    try {
      // Submit to API
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wizardData)
      });
      
      if (response.ok) {
        // Clear draft after successful submission
        localStorage.removeItem('profile-draft');
        return { success: true, message: 'Profile berhasil dikirim' };
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Failed to submit profile:', error);
      return { success: false, message: 'Gagal mengirim profile' };
    }
  }, [wizardData]);

  // Load draft function
  const loadDraft = useCallback(() => {
    try {
      const draft = localStorage.getItem('profile-draft');
      if (draft) {
        const parsedDraft = JSON.parse(draft);
        setWizardData(parsedDraft);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load draft:', error);
      return false;
    }
  }, []);

  return {
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
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === 12,
    activeTabValue,
    setActiveTabValue,
  };
};

// Helper function
const getTabValueByStep = (stepId: number): string => {
  const tabMapping = [
    "data-perusahaan",
    "organisasi-perusahaan",
    "bank",
    "bidang-usaha",
    "dokumen",
    "tenaga-ahli",
    "pengalaman",
    "mitra-kerja",
    "laporan-keuangan",
    "pemasaran",
    "representatif",
    "status-aktivitas",
  ];
  return tabMapping[stepId - 1] || "data-perusahaan";
};