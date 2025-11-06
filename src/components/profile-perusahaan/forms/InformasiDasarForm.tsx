import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData } from '@/types/profile';

interface InformasiDasarFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const InformasiDasarForm: React.FC<InformasiDasarFormProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold">Informasi Dasar</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nomorRegistrasi">Nomor Registrasi</Label>
          <Input
            id="nomorRegistrasi"
            value={formData.nomorRegistrasi}
            onChange={(e) => setFormData({
              ...formData,
              nomorRegistrasi: e.target.value,
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="namaPerusahaan">Nama Perusahaan *</Label>
          <Input
            id="namaPerusahaan"
            value={formData.namaPerusahaan}
            onChange={(e) => setFormData({
              ...formData,
              namaPerusahaan: e.target.value,
            })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="singkatan">Singkatan</Label>
          <Input
            id="singkatan"
            value={formData.singkatan}
            onChange={(e) => setFormData({
              ...formData,
              singkatan: e.target.value,
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="callName">Call Name</Label>
          <Input
            id="callName"
            value={formData.callName}
            onChange={(e) => setFormData({
              ...formData,
              callName: e.target.value,
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="npwp">Nomor Pajak / NPWP *</Label>
          <Input
            id="npwp"
            value={formData.npwp}
            onChange={(e) => setFormData({
              ...formData,
              npwp: e.target.value,
            })}
            required
          />
        </div>

        <div className="space-y-3">
          <Label>Status PKP</Label>
          <RadioGroup
            value={formData.pkpStatus}
            onValueChange={(value) => setFormData({
              ...formData,
              pkpStatus: value
            })}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="non-pkp" />
              <Label htmlFor="non-pkp">Non-PKP</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="pkp" />
              <Label htmlFor="pkp">PKP</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.pkpStatus === "1" && (
          <div className="space-y-2">
            <Label htmlFor="nomorPkp">Nomor PKP *</Label>
            <Input
              id="nomorPkp"
              value={formData.nomorPkp}
              onChange={(e) => setFormData({
                ...formData,
                nomorPkp: e.target.value,
              })}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="nomorAkta">Nomor Akta Pendirian *</Label>
          <Input
            id="nomorAkta"
            value={formData.nomorAkta}
            onChange={(e) => setFormData({
              ...formData,
              nomorAkta: e.target.value,
            })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="terdaftarPada">Terdaftar Pada *</Label>
          <Input
            id="terdaftarPada"
            value={formData.terdaftarPada}
            onChange={(e) => setFormData({
              ...formData,
              terdaftarPada: e.target.value,
            })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailPerusahaan">Email Perusahaan *</Label>
          <Input
            id="emailPerusahaan"
            type="email"
            value={formData.emailPerusahaan}
            onChange={(e) => setFormData({
              ...formData,
              emailPerusahaan: e.target.value,
            })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telepon">Telepon *</Label>
          <div className="flex">
            <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
              <span className="text-sm">+62</span>
            </div>
            <Input
              id="telepon"
              type="tel"
              value={formData.telepon}
              onChange={(e) => setFormData({
                ...formData,
                telepon: e.target.value,
              })}
              className="rounded-l-none"
              placeholder="8123456789"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiDasarForm;