import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';
import DetailPerusahaanForm from "../forms/DetailPerusahaanForm";

interface PemasaranStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const PemasaranStep: React.FC<PemasaranStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Pemasaran
        </h2>
        <p className="text-gray-600">
          Kelola strategi dan data pemasaran perusahaan
        </p>
      </div>

      <div className="space-y-8">
        <DetailPerusahaanForm 
          formData={data} 
          setFormData={setData} 
        />
      </div>
    </div>
  );
};

export default PemasaranStep;