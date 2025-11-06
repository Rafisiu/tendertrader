import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface OrganisasiStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const OrganisasiStep: React.FC<OrganisasiStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Organisasi Perusahaan
        </h2>
        <p className="text-gray-600">
          Kelola struktur organisasi dan divisi perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Struktur Organisasi</CardTitle>
          <CardDescription>
            Tambahkan divisi dan jabatan dalam perusahaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Organisasi Step - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk organisasi perusahaan akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganisasiStep;