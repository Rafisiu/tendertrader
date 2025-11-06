import React from 'react';
import { WizardData } from '@/types/wizard';
import LaporanKeuanganTable from '../tables/LaporanKeuanganTable';

interface LaporanKeuanganStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const LaporanKeuanganStep: React.FC<LaporanKeuanganStepProps> = ({ data, setData }) => {

  // Handler functions for Laporan Keuangan
  const handleEditLaporanKeuangan = (id: number) => {
    console.log('Edit laporan keuangan dengan ID:', id);
  };

  const handleDeleteLaporanKeuangan = (id: number) => {
    setData(prev => ({
      ...prev,
      laporanKeuanganData: prev.laporanKeuanganData.filter(item => item.id !== id)
    }));
  };

  const handleAddLaporanKeuangan = () => {
    console.log('Add new laporan keuangan');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Laporan Keuangan
        </h2>
        <p className="text-gray-600">
          Kelola laporan keuangan dan data finansial perusahaan
        </p>
      </div>

      <div className="space-y-8">
        {/* Laporan Keuangan Table */}
        <LaporanKeuanganTable
          data={data.laporanKeuanganData}
          onEdit={handleEditLaporanKeuangan}
          onDelete={handleDeleteLaporanKeuangan}
          onAdd={handleAddLaporanKeuangan}
        />
      </div>
    </div>
  );
};

export default LaporanKeuanganStep;