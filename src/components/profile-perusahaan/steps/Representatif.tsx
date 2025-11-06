import React from 'react';
import { WizardData } from '@/types/wizard';
import RepresentatifTable from '../tables/RepresentatifTable';

interface RepresentatifStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const RepresentatifStep: React.FC<RepresentatifStepProps> = ({ data, setData }) => {

  // Handler functions for Representatif
  const handleEditRepresentatif = (id: number) => {
    console.log('Edit representatif dengan ID:', id);
  };

  const handleDeleteRepresentatif = (id: number) => {
    setData(prev => ({
      ...prev,
      representatifData: prev.representatifData.filter(item => item.id !== id)
    }));
  };

  const handleAddRepresentatif = () => {
    console.log('Add new representatif');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Representatif
        </h2>
        <p className="text-gray-600">
          Kelola informasi perusahaan representatif dan cabang
        </p>
      </div>

      <div className="space-y-8">
        {/* Representatif Table */}
        <RepresentatifTable
          data={data.representatifData}
          onEdit={handleEditRepresentatif}
          onDelete={handleDeleteRepresentatif}
          onAdd={handleAddRepresentatif}
        />
      </div>
    </div>
  );
};

export default RepresentatifStep;