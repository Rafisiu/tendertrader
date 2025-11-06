import React from 'react';
import { WizardData } from '@/types/wizard';
import DataUmumTable from '../tables/DataUmumTable';
import DataSuratPernyataanTable from '../tables/DataSuratPernyataanTable';
import DataLegalitasTable from '../tables/DataLegalitasTable';
import DataOrganisasiPerusahaanTable from '../tables/DataOrganisasiPerusahaanTable';
import DataKeuanganPerusahaanTable from '../tables/DataKeuanganPerusahaanTable';
import DataPengalamanPerusahaanTable from '../tables/DataPengalamanPerushaanTable';
import DataTeknikPerusahaanTable from '../tables/DataTeknikPerusahaanTable';
import DokumenTambahanTable from '../tables/DokumenTambahanTable';

interface DokumenStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const DokumenStep: React.FC<DokumenStepProps> = ({ data, setData }) => {
  
  // Handler functions for file operations
  const handleFileUpload = (tableName: string, dokumenName: string, file: File) => {
    console.log(`File uploaded - Table: ${tableName}, Document: ${dokumenName}, File: ${file.name}`);
    // Implement file upload logic here
  };

  const handleFileDelete = (tableName: string, dokumenName: string) => {
    console.log(`File deleted - Table: ${tableName}, Document: ${dokumenName}`);
    // Implement file delete logic here
  };

  const handleFileView = (tableName: string, dokumenName: string, fileName: string) => {
    console.log(`File view - Table: ${tableName}, Document: ${dokumenName}, File: ${fileName}`);
    // Implement file view logic here
  };

  // Handler for Dokumen Tambahan (dynamic table)
  const handleDokumenTambahanFileUpload = (id: number, dokumenName: string, file: File) => {
    console.log(`Dokumen Tambahan - File uploaded - ID: ${id}, Document: ${dokumenName}, File: ${file.name}`);
    // Implement file upload logic for dynamic table
  };

  const handleDokumenTambahanFileDelete = (id: number, dokumenName: string) => {
    console.log(`Dokumen Tambahan - File deleted - ID: ${id}, Document: ${dokumenName}`);
    // Implement file delete logic for dynamic table
  };

  const handleDokumenTambahanFileView = (id: number, dokumenName: string, fileName: string) => {
    console.log(`Dokumen Tambahan - File view - ID: ${id}, Document: ${dokumenName}, File: ${fileName}`);
    // Implement file view logic for dynamic table
  };

  const handleDokumenTambahanRowDelete = (id: number) => {
    console.log(`Dokumen Tambahan - Row deleted - ID: ${id}`);
    // Implement row delete logic for dynamic table
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Dokumen Pendukung
        </h2>
        <p className="text-gray-600">
          Upload dokumen pendukung yang diperlukan untuk proses registrasi rekanan
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Data Umum */}
        <DataUmumTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataUmum', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataUmum', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataUmum', dokumenName, fileName)}
        />

        {/* 2. Data Surat Pernyataan */}
        <DataSuratPernyataanTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataSuratPernyataan', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataSuratPernyataan', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataSuratPernyataan', dokumenName, fileName)}
        />

        {/* 3. Data Legalitas */}
        <DataLegalitasTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataLegalitas', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataLegalitas', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataLegalitas', dokumenName, fileName)}
        />

        {/* 4. Data Organisasi Perusahaan */}
        <DataOrganisasiPerusahaanTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataOrganisasiPerusahaan', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataOrganisasiPerusahaan', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataOrganisasiPerusahaan', dokumenName, fileName)}
        />

        {/* 5. Data Keuangan Perusahaan */}
        <DataKeuanganPerusahaanTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataKeuanganPerusahaan', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataKeuanganPerusahaan', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataKeuanganPerusahaan', dokumenName, fileName)}
        />

        {/* 6. Data Pengalaman Perusahaan */}
        <DataPengalamanPerusahaanTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataPengalamanPerusahaan', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataPengalamanPerusahaan', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataPengalamanPerusahaan', dokumenName, fileName)}
        />

        {/* 7. Data Teknik & Produksi Perusahaan */}
        <DataTeknikPerusahaanTable
          onFileUpload={(dokumenName, file) => handleFileUpload('DataTeknikPerusahaan', dokumenName, file)}
          onFileDelete={(dokumenName) => handleFileDelete('DataTeknikPerusahaan', dokumenName)}
          onFileView={(dokumenName, fileName) => handleFileView('DataTeknikPerusahaan', dokumenName, fileName)}
        />

        {/* 8. Dokumen Tambahan */}
        <DokumenTambahanTable
          onFileUpload={handleDokumenTambahanFileUpload}
          onFileDelete={handleDokumenTambahanFileDelete}
          onFileView={handleDokumenTambahanFileView}
          onRowDelete={handleDokumenTambahanRowDelete}
        />
      </div>

      {/* Summary Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Informasi Penting:</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Dokumen yang bertanda (*) bersifat mandatory/wajib diupload</li>
          <li>• Format file yang diterima: PDF (maksimal 10MB per file)</li>
          <li>• Pastikan dokumen yang diupload jelas dan dapat terbaca</li>
          <li>• Periksa kembali kelengkapan dokumen sebelum submit</li>
        </ul>
      </div>
    </div>
  );
};

export default DokumenStep;