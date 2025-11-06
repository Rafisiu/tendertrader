import React from 'react';
import { WizardData } from '@/types/wizard';
import MitraKerjaTable from '../tables/MitraKerjaTable';

interface MitraKerjaStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const MitraKerjaStep: React.FC<MitraKerjaStepProps> = ({ data, setData }) => {

  // Handler functions for Mitra Kerja
  const handleEditMitraKerja = (id: number) => {
    console.log('Edit mitra kerja dengan ID:', id);
  };

  const handleDeleteMitraKerja = (id: number) => {
    setData(prev => ({
      ...prev,
      mitraKerjaData: prev.mitraKerjaData.filter(item => item.id !== id)
    }));
  };

  const handleAddMitraKerja = () => {
    console.log('Add new mitra kerja');
  };

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

      <div className="space-y-8">
        {/* Mitra Kerja Table */}
        <MitraKerjaTable
          data={data.mitraKerjaData}
          onEdit={handleEditMitraKerja}
          onDelete={handleDeleteMitraKerja}
          onAdd={handleAddMitraKerja}
        />
      </div>
    </div>
  );
};

export default MitraKerjaStep;