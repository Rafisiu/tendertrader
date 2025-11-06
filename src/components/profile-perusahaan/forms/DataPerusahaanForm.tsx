import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/profile';
import { kualifikasiOptions, kategoriProdukOptions, industriOptions } from '@/constants/profileOptions';
import MultiSelect from '../shared/MultiSelect';

interface DataPerusahaanFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const DataPerusahaanForm: React.FC<DataPerusahaanFormProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold">Data Perusahaan</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="kualifikasi">Kualifikasi *</Label>
          <Select
            value={formData.kualifikasi}
            onValueChange={(value) => setFormData({
              ...formData,
              kualifikasi: value
            })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih kualifikasi" />
            </SelectTrigger>
            <SelectContent>
              {kualifikasiOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tahunBerdiri">Tahun Berdiri *</Label>
          <Input
            id="tahunBerdiri"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.tahunBerdiri}
            onChange={(e) => setFormData({
              ...formData,
              tahunBerdiri: e.target.value
            })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jumlahKaryawan">Jumlah Karyawan</Label>
          <Input
            id="jumlahKaryawan"
            type="number"
            min="0"
            value={formData.jumlahKaryawan}
            onChange={(e) => setFormData({
              ...formData,
              jumlahKaryawan: e.target.value,
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="situsWeb">Situs Web</Label>
          <Input
            id="situsWeb"
            type="url"
            placeholder="https://example.com"
            value={formData.situsWeb}
            onChange={(e) => setFormData({
              ...formData,
              situsWeb: e.target.value
            })}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Kategori Produk / Layanan</Label>
          <MultiSelect
            options={kategoriProdukOptions}
            selected={formData.kategoriProduk}
            onSelectionChange={(selected) => setFormData({
              ...formData,
              kategoriProduk: selected
            })}
            placeholder="Pilih kategori produk/layanan"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Industri</Label>
          <MultiSelect
            options={industriOptions}
            selected={formData.industri}
            onSelectionChange={(selected) => setFormData({
              ...formData,
              industri: selected
            })}
            placeholder="Pilih industri"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="kataKunci">Kata Kunci</Label>
          <Input
            id="kataKunci"
            placeholder="Masukkan kata kunci yang relevan"
            value={formData.kataKunci}
            onChange={(e) => setFormData({
              ...formData,
              kataKunci: e.target.value
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DataPerusahaanForm;