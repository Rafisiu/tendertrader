import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';
import KomisarisTable from '../tables/KomisarisTable';
import DireksiTable from '../tables/DireksiTable';
import PemegangSahamTable from '../tables/PemegangSahamTable';

interface OrganisasiStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const OrganisasiStep: React.FC<OrganisasiStepProps> = ({ data, setData }) => {

  const handleEditKomisaris = (id: number) => {
    console.log('Edit komisaris dengan ID:', id);
  };

  const handleDeleteKomisaris = (id: number) => {
    setData(prev => ({
      ...prev,
      komisarisData: prev.komisarisData.filter(item => item.id !== id)
    }));
  };

  const handleAddKomisaris = () => {
    console.log('Add new komisaris');
  };

  const handleEditDireksi = (id: number) => {
    console.log('Edit Direksi dengan ID:', id);
  };

  const handleDeleteDireksi = (id: number) => {
    setData(prev => ({
      ...prev,
      direksiData: prev.direksiData.filter(item => item.id !== id)
    }));
  };

  const handleAddDireksi = () => {
    console.log('Add new Direksi');
  };

  const handleEditPemegangSaham = (id: number) => {
    console.log('Edit Pemegang Saham dengan ID:', id);
  };

  const handleDeletePemegangSaham = (id: number) => {
    setData(prev => ({
      ...prev,
      pemegangSahamData: prev.pemegangSahamData.filter(item => item.id !== id)
    }));
  };

  const handleAddPemegangSaham = () => {
    console.log('Add new Pemegang Saham');
  };

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

      <div className="space-y-8">
        <KomisarisTable
          data={data.komisarisData}
          onEdit={handleEditKomisaris}
          onDelete={handleDeleteKomisaris}
          onAdd={handleAddKomisaris}
        />

        <DireksiTable
          data={data.direksiData}
          onEdit={handleEditDireksi}
          onDelete={handleDeleteDireksi}
          onAdd={handleAddDireksi}
        />

        <PemegangSahamTable
          data={data.pemegangSahamData}
          onEdit={handleEditPemegangSaham}
          onDelete={handleDeletePemegangSaham}
          onAdd={handleAddPemegangSaham}
        />
      </div>
    </div>
  );
};

export default OrganisasiStep;