import { 
  AlamatData, 
  PicData, 
  TenagaAhliData, 
  PeralatanData, 
  PengalamanData, 
  MitraKerjaData, 
  LaporanKeuanganData, 
  RepresentatifData 
} from '@/types/wizard';

// Default Alamat Data
export const DEFAULT_ALAMAT_DATA: AlamatData[] = [
  {
    id: 1,
    namaGedung: "Gedung Utama PT Example",
    tipeGedung: "Kantor Pusat",
    kepemilikan: "Milik Sendiri",
    ukuran: "500 m²",
    negara: "Indonesia",
    provinsi: "DKI Jakarta",
    telepon: "021-1234567"
  }
];

// Default PIC Data
export const DEFAULT_PIC_DATA: PicData[] = [
  {
    id: 1,
    nama: "Budi Santoso",
    telepon: "081234567890",
    email: "budi.santoso@example.com",
    jabatan: "Direktur Utama"
  }
];

// Default Komisaris Data
export const DEFAULT_KOMISARIS_DATA = [
  {
    id: 1,
    nama: "Dr. Ahmad Wijaya",
    nomorIdentitas: "3271081234567890",
    file: "komisaris_ahmad_wijaya.pdf",
    jabatan: "Komisaris Utama"
  }
];

// Default Direksi Data
export const DEFAULT_DIREKSI_DATA = [
  {
    id: 1,
    nama: "Siti Rahayu, S.E., M.M.",
    nomorIdentitas: "3271085678901234",
    file: "direksi_siti_rahayu.pdf",
    jabatan: "Direktur Utama"
  }
];

// Default Pemegang Saham Data
export const DEFAULT_PEMEGANG_SAHAM_DATA = [
  {
    id: 1,
    nama: "PT Investasi Nusantara",
    nomorIdentitas: "02.123.456.7-890.000",
    nilaiSaham: 65
  }
];

// Default Bank Data
export const DEFAULT_BANK_DATA = [
  {
    id: 1,
    namaBank: "Bank Central Asia (BCA)",
    cabang: "KCP Jakarta Sudirman",
    nomorRekening: "1234567890",
    pemegangRekening: "PT Example Indonesia",
    mataUang: "IDR",
    prioritasPembayaran: true
  }
];

// Default Bidang Usaha Data
export const DEFAULT_BIDANG_USAHA_DATA = [
  {
    id: 1,
    bidangUsaha: "Konstruksi Bangunan Gedung",
    kualifikasi: "Kualifikasi Besar"
  }
];

// Default Tenaga Ahli Data
export const DEFAULT_TENAGA_AHLI_DATA: TenagaAhliData[] = [
  {
    id: 1,
    nama: "Ir. Bambang Sutrisno, M.T.",
    tanggalLahir: "1980-05-15",
    profesi: "Structural Engineer",
    pendidikan: "S2 Teknik Sipil ITB"
  }
];

// Default Peralatan Data
export const DEFAULT_PERALATAN_DATA: PeralatanData[] = [
  {
    id: 1,
    tipe: "Excavator",
    kuantitas: 2,
    kapasitas: "20 Ton",
    merek: "Caterpillar 320D",
    kondisi: "Baik",
    lokasi: "Jakarta",
    kepemilikan: "Milik Sendiri"
  }
];

// Default Pengalaman Data
export const DEFAULT_PENGALAMAN_DATA: PengalamanData[] = [
  {
    id: 1,
    namaProyek: "Pembangunan Gedung Perkantoran XYZ Tower",
    mitraBisnis: "PT Mitra Konstruksi Utama",
    negara: "Indonesia",
    pemilikProyek: "PT XYZ Development",
    tipeProyek: "Konstruksi Gedung",
    bidangUsaha: "Konstruksi Bangunan Gedung",
    status: "Selesai",
    nomorKontrak: "KTR/2023/001",
    tanggalKontrak: "2023-01-15",
    nilaiKontrak: 15000000000,
    perjanjianKontrak: "kontrak_xyz_tower.pdf"
  }
];

// Default Mitra Kerja Data
export const DEFAULT_MITRA_KERJA_DATA: MitraKerjaData[] = [
  {
    id: 1,
    mitraKerja: "PT Global Construction Partner",
    negara: "Indonesia",
    statusMitraKerja: "Aktif",
    pemilikProyek: "Kementerian PUPR",
    tipeProyek: "Infrastruktur Jalan",
    bidangUsaha: "Konstruksi Jalan dan Jembatan",
    status: "Berjalan",
    nomorKontrak: "MOU/2024/002",
    tanggalKontrak: "2024-03-01",
    nilaiKontrak: 25000000000,
    perjanjianKontrak: "mou_global_construction.pdf"
  }
];

// Default Laporan Keuangan Data
export const DEFAULT_LAPORAN_KEUANGAN_DATA: LaporanKeuanganData[] = [
  {
    id: 1,
    tahunPembukaan: "2023",
    asetLancar: 5000000000,
    utangLancar: 2000000000,
    rasioLancar: 2.5,
    totalUtang: 3500000000,
    modal: 8000000000,
    rasioUtangTerhadapModal: 0.44
  }
];

// Default Representatif Data
export const DEFAULT_REPRESENTATIF_DATA: RepresentatifData[] = [
  {
    id: 1,
    namaPerusahaan: "PT Indonesia Construction Services",
    telepon: "021-5551234",
    email: "info@indonesiaconstruction.co.id",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat",
    informasi: "Perusahaan konstruksi dengan pengalaman 20 tahun dalam pembangunan infrastruktur",
    statusPerusahaan: "Aktif"
  }
];

// Combine all default data
export const DEFAULT_WIZARD_DATA = {
  alamatData: DEFAULT_ALAMAT_DATA,
  picData: DEFAULT_PIC_DATA,
  komisarisData: DEFAULT_KOMISARIS_DATA,
  direksiData: DEFAULT_DIREKSI_DATA,
  pemegangSahamData: DEFAULT_PEMEGANG_SAHAM_DATA,
  bankData: DEFAULT_BANK_DATA,
  bidangUsahaData: DEFAULT_BIDANG_USAHA_DATA,
  tenagaAhliData: DEFAULT_TENAGA_AHLI_DATA,
  peralatanData: DEFAULT_PERALATAN_DATA,
  pengalamanData: DEFAULT_PENGALAMAN_DATA,
  mitraKerjaData: DEFAULT_MITRA_KERJA_DATA,
  laporanKeuanganData: DEFAULT_LAPORAN_KEUANGAN_DATA,
  representatifData: DEFAULT_REPRESENTATIF_DATA
};