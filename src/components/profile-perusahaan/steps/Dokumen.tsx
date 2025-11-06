import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface DokumenStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const DokumenStep: React.FC<DokumenStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Dokumen Pendukung
        </h2>
        <p className="text-gray-600">
          Upload dokumen pendukung yang diperlukan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Dokumen</CardTitle>
          <CardDescription>
            Upload akta pendirian, NPWP, dan dokumen lainnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Dokumen Step - Coming Soon</p>
            <p className="text-sm mt-2">Form upload dokumen akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DokumenStep;