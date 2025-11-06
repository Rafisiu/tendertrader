import React from 'react';
import { WizardData } from '@/types/wizard';
import PengalamanTable from '../tables/PengalamanTable';

interface PengalamanStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const PengalamanStep: React.FC<PengalamanStepProps> = ({ data, setData }) => {

  // Handler functions for Pengalaman
  const handleEditPengalaman = (id: number) => {
    console.log('Edit pengalaman dengan ID:', id);
  };

  const handleDeletePengalaman = (id: number) => {
    setData(prev => ({
      ...prev,
      pengalamanData: prev.pengalamanData.filter(item => item.id !== id)
    }));
  };

  const handleAddPengalaman = () => {
    console.log('Add new pengalaman');
  };

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

      <div className="space-y-8">
        {/* Pengalaman Table */}
        <PengalamanTable
          data={data.pengalamanData}
          onEdit={handleEditPengalaman}
          onDelete={handleDeletePengalaman}
          onAdd={handleAddPengalaman}
        />
      </div>
    </div>
  );
};

export default PengalamanStep;