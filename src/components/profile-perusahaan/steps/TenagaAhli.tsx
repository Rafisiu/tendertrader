import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface TenagaAhliStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const TenagaAhliStep: React.FC<TenagaAhliStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Tenaga Ahli
        </h2>
        <p className="text-gray-600">
          Kelola informasi tenaga ahli dan peralatan perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenaga Ahli & Peralatan</CardTitle>
          <CardDescription>
            Tambahkan informasi SDM ahli dan peralatan yang dimiliki
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Tenaga Ahli - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk tenaga ahli akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenagaAhliStep;