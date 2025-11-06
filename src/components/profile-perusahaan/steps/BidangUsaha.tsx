import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';

interface BidangUsahaStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const BidangUsahaStep: React.FC<BidangUsahaStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Bidang Usaha
        </h2>
        <p className="text-gray-600">
          Kelola bidang usaha dan kategori produk perusahaan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bidang Usaha Perusahaan</CardTitle>
          <CardDescription>
            Pilih bidang usaha dan kategori produk yang sesuai dengan perusahaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Data Bidang Usaha - Coming Soon</p>
            <p className="text-sm mt-2">Form untuk bidang usaha akan ditambahkan di sini</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidangUsahaStep;