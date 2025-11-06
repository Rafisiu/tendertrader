import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Eye, Trash2, Image, FileText } from 'lucide-react';
import { WizardData } from '@/types/wizard';

interface DetailPerusahaanFormProps {
  formData: WizardData;
  setFormData: React.Dispatch<React.SetStateAction<WizardData>>;
}

interface FileData {
  file: File | null;
  fileName: string;
  fileUrl?: string;
}

const DetailPerusahaanForm: React.FC<DetailPerusahaanFormProps> = ({
  formData,
  setFormData
}) => {
  const [logo, setLogo] = useState<FileData>({ file: null, fileName: '' });
  const [banner, setBanner] = useState<FileData>({ file: null, fileName: '' });
  const [profilPerusahaan, setProfilPerusahaan] = useState<FileData>({ file: null, fileName: '' });

  const [socialMedia, setSocialMedia] = useState({
    facebook: formData.facebook || '',
    linkedIn: formData.linkedIn || '',
    instagram: formData.instagram || '',
    twitter: formData.twitter || ''
  });

  const [deskripsi, setDeskripsi] = useState(formData.deskripsi || '');

  // Handle file upload
  const handleFileUpload = (fileType: 'logo' | 'banner' | 'profilPerusahaan', file: File) => {
    const fileData = {
      file,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file)
    };

    switch (fileType) {
      case 'logo':
        setLogo(fileData);
        setFormData(prev => ({ ...prev, logo: file.name }));
        break;
      case 'banner':
        setBanner(fileData);
        setFormData(prev => ({ ...prev, banner: file.name }));
        break;
      case 'profilPerusahaan':
        setProfilPerusahaan(fileData);
        setFormData(prev => ({ ...prev, profilPerusahaan: file.name }));
        break;
    }
  };

  // Handle file delete
  const handleFileDelete = (fileType: 'logo' | 'banner' | 'profilPerusahaan') => {
    switch (fileType) {
      case 'logo':
        setLogo({ file: null, fileName: '' });
        setFormData(prev => ({ ...prev, logo: '' }));
        break;
      case 'banner':
        setBanner({ file: null, fileName: '' });
        setFormData(prev => ({ ...prev, banner: '' }));
        break;
      case 'profilPerusahaan':
        setProfilPerusahaan({ file: null, fileName: '' });
        setFormData(prev => ({ ...prev, profilPerusahaan: '' }));
        break;
    }
  };

  // Handle file view
  const handleFileView = (fileData: FileData) => {
    if (fileData.fileUrl) {
      window.open(fileData.fileUrl, '_blank');
    }
  };

  // Handle social media input changes
  const handleSocialMediaChange = (platform: string, value: string) => {
    const updatedSocialMedia = { ...socialMedia, [platform]: value };
    setSocialMedia(updatedSocialMedia);
    setFormData(prev => ({ ...prev, [platform]: value }));
  };

  // Handle deskripsi change
  const handleDeskripsiChange = (value: string) => {
    setDeskripsi(value);
    setFormData(prev => ({ ...prev, deskripsi: value }));
  };

  // File upload component
  const FileUploadSection = ({ 
    title, 
    fileData, 
    fileType, 
    acceptedTypes,
    icon 
  }: { 
    title: string; 
    fileData: FileData; 
    fileType: 'logo' | 'banner' | 'profilPerusahaan';
    acceptedTypes: string;
    icon: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{title}</Label>
      <div className="flex items-center gap-4">
        {!fileData.file ? (
          <label className="cursor-pointer">
            <input
              type="file"
              accept={acceptedTypes}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(fileType, file);
              }}
              className="hidden"
            />
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload {title}
              </span>
            </Button>
          </label>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
              {icon}
              <span className="text-sm text-gray-700 max-w-[200px] truncate">
                {fileData.fileName}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFileView(fileData)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFileDelete(fileType)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
      {fileData.fileName && (
        <p className="text-xs text-gray-500">
          File berhasil diupload: {fileData.fileName}
        </p>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Perusahaan</CardTitle>
        <CardDescription>
          Kelola logo, banner, deskripsi, dan informasi media sosial perusahaan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo Upload */}
        <FileUploadSection
          title="Logo"
          fileData={logo}
          fileType="logo"
          acceptedTypes="image/*"
          icon={<Image className="h-4 w-4 text-blue-500" />}
        />

        {/* Banner Upload */}
        <FileUploadSection
          title="Banner"
          fileData={banner}
          fileType="banner"
          acceptedTypes="image/*"
          icon={<Image className="h-4 w-4 text-green-500" />}
        />

        {/* Deskripsi */}
        <div className="space-y-2">
          <Label htmlFor="deskripsi" className="text-sm font-medium">
            Deskripsi
          </Label>
          <Textarea
            id="deskripsi"
            placeholder="Masukkan deskripsi perusahaan..."
            value={deskripsi}
            onChange={(e) => handleDeskripsiChange(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-gray-500">
            Jelaskan tentang perusahaan, visi, misi, dan keunggulan kompetitif
          </p>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Media Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Facebook */}
              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-sm font-medium">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  placeholder="https://facebook.com/perusahaan"
                  value={socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="linkedIn" className="text-sm font-medium">
                  LinkedIn
                </Label>
                <Input
                  id="linkedIn"
                  type="url"
                  placeholder="https://linkedin.com/company/perusahaan"
                  value={socialMedia.linkedIn}
                  onChange={(e) => handleSocialMediaChange('linkedIn', e.target.value)}
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-sm font-medium">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  placeholder="https://instagram.com/perusahaan"
                  value={socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                />
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-sm font-medium">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  type="url"
                  placeholder="https://twitter.com/perusahaan"
                  value={socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profil Perusahaan PDF */}
        <FileUploadSection
          title="Profil Perusahaan (PDF)"
          fileData={profilPerusahaan}
          fileType="profilPerusahaan"
          acceptedTypes=".pdf"
          icon={<FileText className="h-4 w-4 text-red-500" />}
        />

        {/* Info Section */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Informasi Penting:</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Logo dan banner sebaiknya berformat PNG atau JPG dengan resolusi tinggi</li>
            <li>• Ukuran maksimal file gambar: 5MB</li>
            <li>• Profil perusahaan harus dalam format PDF dengan ukuran maksimal 10MB</li>
            <li>• Pastikan link media sosial valid dan dapat diakses</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailPerusahaanForm;