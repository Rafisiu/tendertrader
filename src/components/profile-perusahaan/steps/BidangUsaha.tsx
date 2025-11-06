import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';
import BidangUsahaTable from '../tables/BidangUsahaTable';

interface BidangUsahaStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const BidangUsahaStep: React.FC<BidangUsahaStepProps> = ({ data, setData }) => {

  const handleEditBidangUsaha = (id: number) => {
    console.log('Edit bidang usaha dengan ID:', id);
  };

  const handleDeleteBidangUsaha = (id: number) => {
    setData(prev => ({
      ...prev,
      bidangUsahaData: prev.bidangUsahaData.filter(item => item.id !== id)
    }));
  };

  const handleAddBidangUsaha = () => {
    console.log('Add new bidang usaha');
  };

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

      <div className="space-y-8">
        <BidangUsahaTable
          data={data.bidangUsahaData}
          onEdit={handleEditBidangUsaha}
          onDelete={handleDeleteBidangUsaha}
          onAdd={handleAddBidangUsaha}
        />
      </div>
    </div>
  );
};

export default BidangUsahaStep;