// types/profile.ts
export interface FormData {
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
