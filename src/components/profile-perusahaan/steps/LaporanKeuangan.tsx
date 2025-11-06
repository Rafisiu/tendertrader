import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface LaporanKeuanganStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const LaporanKeuanganStep: React.FC<LaporanKeuanganStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Laporan Keuangan
        </h2>
        <p className="text-gray-600">
          Upload dan kelola laporan keuangan perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Laporan Keuangan</CardTitle>
          <CardDescription>
            Upload laporan keuangan tahunan dan dokumen finansial lainnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Laporan Keuangan - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk laporan keuangan akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaporanKeuanganStep;