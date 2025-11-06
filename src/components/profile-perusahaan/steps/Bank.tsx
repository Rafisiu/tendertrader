import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface BankStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const BankStep: React.FC<BankStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Bank
        </h2>
        <p className="text-gray-600">
          Masukkan informasi rekening bank perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Bank</CardTitle>
          <CardDescription>
            Tambahkan rekening bank untuk transaksi perusahaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Bank - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk informasi bank akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankStep;