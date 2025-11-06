import React from 'react';
import { WizardData } from '@/types/wizard';
import InformasiDasarForm from '../forms/InformasiDasarForm';
import TipeVendorForm from '../forms/TipeVendorForm';
import DataPerusahaanForm from '../forms/DataPerusahaanForm';
import AlamatTable from '../tables/AlamatTable';
import PicTable from '../tables/PicTable';

interface DataPerusahaanStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const DataPerusahaanStep: React.FC<DataPerusahaanStepProps> = ({ 
  data, 
  setData 
}) => {
  const handleEditAlamat = (id: number) => {
    console.log('Edit alamat dengan ID:', id);
  };

  const handleDeleteAlamat = (id: number) => {
    setData(prev => ({
      ...prev,
      alamatData: prev.alamatData.filter(item => item.id !== id)
    }));
  };

  const handleAddAlamat = () => {
    console.log('Add new alamat');
  };

  const handleEditPic = (id: number) => {
    console.log('Edit PIC dengan ID:', id);
  };

  const handleDeletePic = (id: number) => {
    setData(prev => ({
      ...prev,
      picData: prev.picData.filter(item => item.id !== id)
    }));
  };

  const handleAddPic = () => {
    console.log('Add new PIC');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Data Perusahaan
        </h2>
        <p className="text-gray-600">
          Masukkan informasi dasar perusahaan, alamat, dan person in charge
        </p>
      </div>

      <div className="space-y-8">
        <InformasiDasarForm formData={data} setFormData={setData} />
        <TipeVendorForm formData={data} setFormData={setData} />
        <DataPerusahaanForm formData={data} setFormData={setData} />
        
        <AlamatTable
          data={data.alamatData}
          onEdit={handleEditAlamat}
          onDelete={handleDeleteAlamat}
          onAdd={handleAddAlamat}
        />

        <PicTable
          data={data.picData}
          onEdit={handleEditPic}
          onDelete={handleDeletePic}
          onAdd={handleAddPic}
        />
      </div>
    </div>
  );
};

export default DataPerusahaanStep;