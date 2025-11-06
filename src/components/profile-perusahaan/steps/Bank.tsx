import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/types/wizard';
import BankTable from '../tables/BankTable';

interface BankStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const BankStep: React.FC<BankStepProps> = ({ data, setData }) => {

  const handleEditBank = (id: number) => {
    console.log('Edit bank dengan ID:', id);
  };

  const handleDeleteBank = (id: number) => {
    setData(prev => ({
      ...prev,
      bankData: prev.bankData.filter(item => item.id !== id)
    }));
  };

  const handleAddBank = () => {
    console.log('Add new bank');
  };

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

      <div className="space-y-8">
        <BankTable
          data={data.bankData}
          onEdit={handleEditBank}
          onDelete={handleDeleteBank}
          onAdd={handleAddBank}
        />
      </div>
    </div>
  );
};

export default BankStep;