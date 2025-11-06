import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Calendar, FileCheck, Download, ExternalLink } from 'lucide-react';
import { WizardData } from '@/types/wizard';

interface StatusAktivitasStepProps {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
}

const StatusAktivitasStep: React.FC<StatusAktivitasStepProps> = ({ data, setData }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Status Aktivitas Perusahaan
        </h2>
        <p className="text-gray-600">
          Status dan konfirmasi profil perusahaan Anda
        </p>
      </div>

      {/* Status Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-800 text-2xl">
            Profil Perusahaan Aktif
          </CardTitle>
          <CardDescription className="text-green-700 text-lg">
            Selamat! Profil perusahaan Anda telah berhasil diverifikasi dan diaktifkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
              ✓ STATUS AKTIF
            </Badge>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Terima kasih telah melengkapi seluruh data profil perusahaan. 
              Tim kami telah melakukan verifikasi dan dengan senang hati mengonfirmasi bahwa 
              profil perusahaan <span className="font-semibold text-green-700">{data.namaPerusahaan || 'Anda'}</span> 
              telah memenuhi semua persyaratan dan kini berstatus aktif.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detail Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Status Verifikasi</p>
                <p className="text-sm text-gray-500">Dokumen Lengkap</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Status Keanggotaan</p>
                <p className="text-sm text-gray-500">Rekanan Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Tanggal Aktivasi</p>
                <p className="text-sm text-gray-500">{currentDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thank You Message */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 text-xl">
            🎉 Terima Kasih!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-blue-700">
              Kami mengucapkan terima kasih atas kepercayaan Anda untuk bergabung sebagai rekanan. 
              Dengan status aktif ini, Anda kini dapat:
            </p>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Mengikuti tender dan lelang yang tersedia
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Mengakses informasi proyek dan peluang bisnis
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Menjalin kemitraan dengan perusahaan lain
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Mendapatkan notifikasi untuk peluang yang sesuai
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Langkah Selanjutnya</CardTitle>
          <CardDescription>
            Akses fitur dan layanan yang tersedia untuk rekanan aktif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Lihat Tender Tersedia
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Sertifikat
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Dashboard Rekanan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Jika Anda memiliki pertanyaan atau memerlukan bantuan, jangan ragu untuk menghubungi tim support kami
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-500">
              <span>📧 support@vms.com</span>
              <span>📞 021-1234-5678</span>
              <span>🕒 Senin - Jumat, 08:00 - 17:00 WIB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusAktivitasStep;