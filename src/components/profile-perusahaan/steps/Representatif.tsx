import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface RepresentatifStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const RepresentatifStep: React.FC<RepresentatifStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Representatif
        </h2>
        <p className="text-gray-600">
          Kelola informasi perusahaan representatif dan cabang
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perusahaan Representatif</CardTitle>
          <CardDescription>
            Tambahkan informasi tentang cabang dan perwakilan perusahaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Representatif - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk representatif akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepresentatifStep;