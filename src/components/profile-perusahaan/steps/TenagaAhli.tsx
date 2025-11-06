import React from 'react';
import { WizardData } from '@/types/wizard';
import TenagaAhliTable from '../tables/TenagaAhliTable';
import PeralatanTable from '../tables/PeralatanTable';

interface TenagaAhliStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const TenagaAhliStep: React.FC<TenagaAhliStepProps> = ({ data, setData }) => {

  // Handler functions for Tenaga Ahli
  const handleEditTenagaAhli = (id: number) => {
    console.log('Edit tenaga ahli dengan ID:', id);
  };

  const handleDeleteTenagaAhli = (id: number) => {
    setData(prev => ({
      ...prev,
      tenagaAhliData: prev.tenagaAhliData.filter(item => item.id !== id)
    }));
  };

  const handleAddTenagaAhli = () => {
    console.log('Add new tenaga ahli');
  };

  // Handler functions for Peralatan
  const handleEditPeralatan = (id: number) => {
    console.log('Edit peralatan dengan ID:', id);
  };

  const handleDeletePeralatan = (id: number) => {
    setData(prev => ({
      ...prev,
      peralatanData: prev.peralatanData.filter(item => item.id !== id)
    }));
  };

  const handleAddPeralatan = () => {
    console.log('Add new peralatan');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Tenaga Ahli & Peralatan
        </h2>
        <p className="text-gray-600">
          Kelola informasi tenaga ahli dan peralatan perusahaan
        </p>
      </div>

      <div className="space-y-8">
        {/* Tenaga Ahli Table */}
        <TenagaAhliTable
          data={data.tenagaAhliData}
          onEdit={handleEditTenagaAhli}
          onDelete={handleDeleteTenagaAhli}
          onAdd={handleAddTenagaAhli}
        />

        {/* Peralatan Table */}
        <PeralatanTable
          data={data.peralatanData}
          onEdit={handleEditPeralatan}
          onDelete={handleDeletePeralatan}
          onAdd={handleAddPeralatan}
        />
      </div>
    </div>
  );
};

export default TenagaAhliStep;