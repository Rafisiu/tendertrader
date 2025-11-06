export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface AlamatData {
  id: number;
  namaGedung: string;
  tipeGedung: string;
  kepemilikan: string;
  ukuran: string;
  negara: string;
  provinsi: string;
  telepon: string;
}

export interface PicData {
  id: number;
  nama: string;
  telepon: string;
  email: string;
  jabatan: string;
}

// New interfaces for additional tables
export interface KomisarisData {
  id: number;
  nama: string;
  nomorIdentitas: string;
  file: string;
  jabatan: string;
}

export interface DireksiData {
  id: number;
  nama: string;
  nomorIdentitas: string;
  file: string;
  jabatan: string;
}

export interface PemegangSahamData {
  id: number;
  nama: string;
  nomorIdentitas: string;
  nilaiSaham: number;
}

export interface BankData {
  id: number;
  namaBank: string;
  cabang: string;
  nomorRekening: string;
  pemegangRekening: string;
  mataUang: string;
  prioritasPembayaran: boolean;
}

export interface BidangUsahaData {
  id: number;
  bidangUsaha: string;
  kualifikasi: string;
}

// New interfaces for step 6-11
export interface TenagaAhliData {
  id: number;
  nama: string;
  tanggalLahir: string;
  profesi: string;
  pendidikan: string;
}

export interface PeralatanData {
  id: number;
  tipe: string;
  kuantitas: number;
  kapasitas: string;
  merek: string;
  kondisi: string;
  lokasi: string;
  kepemilikan: string;
}

export interface PengalamanData {
  id: number;
  namaProyek: string;
  mitraBisnis: string;
  negara: string;
  pemilikProyek: string;
  tipeProyek: string;
  bidangUsaha: string;
  status: string;
  nomorKontrak: string;
  tanggalKontrak: string;
  nilaiKontrak: number;
  perjanjianKontrak: string;
}

export interface MitraKerjaData {
  id: number;
  mitraKerja: string;
  negara: string;
  statusMitraKerja: string;
  pemilikProyek: string;
  tipeProyek: string;
  bidangUsaha: string;
  status: string;
  nomorKontrak: string;
  tanggalKontrak: string;
  nilaiKontrak: number;
  perjanjianKontrak: string;
}

export interface LaporanKeuanganData {
  id: number;
  tahunPembukaan: string;
  asetLancar: number;
  utangLancar: number;
  rasioLancar: number;
  totalUtang: number;
  modal: number;
  rasioUtangTerhadapModal: number;
}

export interface RepresentatifData {
  id: number;
  namaPerusahaan: string;
  telepon: string;
  email: string;
  alamat: string;
  informasi: string;
  statusPerusahaan: string;
}

// Add interface for default data
export interface DefaultWizardData {
  alamatData: AlamatData[];
  picData: PicData[];
  komisarisData: KomisarisData[];
  direksiData: DireksiData[];
  pemegangSahamData: PemegangSahamData[];
  bankData: BankData[];
  bidangUsahaData: BidangUsahaData[];
  tenagaAhliData: TenagaAhliData[];
  peralatanData: PeralatanData[];
  pengalamanData: PengalamanData[];
  mitraKerjaData: MitraKerjaData[];
  laporanKeuanganData: LaporanKeuanganData[];
  representatifData: RepresentatifData[];
}

export interface WizardData {
  // Step 1 - Data Perusahaan
  nomorRegistrasi: string;
  namaPerusahaan: string;
  singkatan: string;
  callName: string;
  npwp: string;
  pkpStatus: string;
  nomorPkp: string;
  nomorAkta: string;
  terdaftarPada: string;
  emailPerusahaan: string;
  telepon: string;
  kepemilikan: string;
  jenisBadanUsaha: string;
  lokasi: string;
  kualifikasi: string;
  tahunBerdiri: string;
  jumlahKaryawan: string;
  situsWeb: string;
  kategoriProduk: string[];
  industri: string[];
  kataKunci: string;

  // Tables
  alamatData: AlamatData[];
  picData: PicData[];

  // Step 2 - Organisasi data
  komisarisData: KomisarisData[];
  direksiData: DireksiData[];
  pemegangSahamData: PemegangSahamData[];

  // Step 3 - Bank data
  bankData: BankData[];

  // Step 4 - Bidang Usaha data
  bidangUsahaData: BidangUsahaData[];

  // Step 6 - Tenaga Ahli data
  tenagaAhliData: TenagaAhliData[];
  peralatanData: PeralatanData[];

  // Step 7 - Pengalaman data
  pengalamanData: PengalamanData[];

  // Step 8 - Mitra Kerja data
  mitraKerjaData: MitraKerjaData[];

  // Step 9 - Laporan Keuangan data
  laporanKeuanganData: LaporanKeuanganData[];

  // Step 10 - Detail Perusahaan (Pemasaran)
  logo?: string;
  banner?: string;
  deskripsi?: string;
  facebook?: string;
  linkedIn?: string;
  instagram?: string;
  twitter?: string;
  profilPerusahaan?: string;

  // Step 11 - Representatif data
  representatifData: RepresentatifData[];

  // Other steps data
  strukturOrganisasi?: any[];
  dokumenData?: any[];
}

export type WizardAction = 'previous' | 'next' | 'save-draft' | 'submit';