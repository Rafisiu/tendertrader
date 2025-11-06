import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/profile';
import { kepemilikanOptions, lokasiOptions } from '@/constants/profileOptions';

interface TipeVendorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const TipeVendorForm: React.FC<TipeVendorFormProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold">Tipe Vendor</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="kepemilikan">Kepemilikan *</Label>
          <Select
            value={formData.kepemilikan}
            onValueChange={(value) => setFormData({
              ...formData,
              kepemilikan: value
            })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih kepemilikan" />
            </SelectTrigger>
            <SelectContent>
              {kepemilikanOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jenisBadanUsaha">Jenis Badan Usaha *</Label>
          <Select
            value={formData.jenisBadanUsaha}
            onValueChange={(value) => setFormData({
              ...formData,
              jenisBadanUsaha: value
            })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis badan usaha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PT">PT (Perseroan Terbatas)</SelectItem>
              <SelectItem value="Persero">Persero</SelectItem>
              <SelectItem value="CV">CV (Commanditaire Vennootschap)</SelectItem>
              <SelectItem value="Firma">Firma</SelectItem>
              <SelectItem value="Koperasi">Koperasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lokasi">Lokasi *</Label>
          <Select
            value={formData.lokasi}
            onValueChange={(value) => setFormData({
              ...formData,
              lokasi: value
            })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih lokasi" />
            </SelectTrigger>
            <SelectContent>
              {lokasiOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TipeVendorForm;