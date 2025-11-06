import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

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

      <Card>
        <CardHeader>
          <CardTitle>Strategi Pemasaran</CardTitle>
          <CardDescription>
            Tambahkan informasi tentang strategi dan aktivitas pemasaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Pemasaran - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk pemasaran akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PemasaranStep;