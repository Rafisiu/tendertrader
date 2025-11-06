import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface StatusAktivitasStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const StatusAktivitasStep: React.FC<StatusAktivitasStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Status Aktivitas
        </h2>
        <p className="text-gray-600">
          Kelola status dan aktivitas perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status Aktivitas Perusahaan</CardTitle>
          <CardDescription>
            Review dan konfirmasi status aktivitas perusahaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Status Aktivitas - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk status aktivitas akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusAktivitasStep;