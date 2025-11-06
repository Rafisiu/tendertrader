import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface PengalamanStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const PengalamanStep: React.FC<PengalamanStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Pengalaman
        </h2>
        <p className="text-gray-600">
          Kelola riwayat pengalaman dan proyek perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pengalaman Perusahaan</CardTitle>
          <CardDescription>
            Tambahkan riwayat proyek dan pengalaman kerja perusahaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Pengalaman - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk pengalaman akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PengalamanStep;