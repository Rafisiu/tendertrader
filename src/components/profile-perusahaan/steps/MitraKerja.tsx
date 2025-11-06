import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface MitraKerjaStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const MitraKerjaStep: React.FC<MitraKerjaStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Mitra Kerja
        </h2>
        <p className="text-gray-600">
          Kelola informasi mitra kerja dan partnership perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mitra Kerja & Partnership</CardTitle>
          <CardDescription>
            Tambahkan informasi mitra kerja dan kerjasama strategis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Mitra Kerja - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk mitra kerja akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MitraKerjaStep;