import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Eye, Trash2, AlertCircle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DokumenLegalitasData {
    dokumen: string;
    nomorDokumen: string;
    penerbitDokumen: string;
    tanggalTerbit: string;
    tanggalBerakhir: string;
    file: File | null;
    fileName: string;
    isMandatory: boolean;
}

interface DataLegalitasTableProps {
    onFileUpload?: (dokumenName: string, file: File) => void;
    onFileDelete?: (dokumenName: string) => void;
    onFileView?: (dokumenName: string, fileName: string) => void;
}

const DataLegalitasTable: React.FC<DataLegalitasTableProps> = ({ 
    onFileUpload,
    onFileDelete,
    onFileView
}) => {
    const [dokumenData, setDokumenData] = useState<DokumenLegalitasData[]>([
        { dokumen: "Akta pendirian perusahaan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "SK Kemenkumham atas akta pendirian perusahaan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: true },
        { dokumen: "Tambahan berita negara RI akta peubahan terakhir", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Akta perubahan perusahaan terakhir", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "SK kemenkumham akta perubahan terakhir/surat pemberitahuan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Surat izin usaha perdagangan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Tambahan berita negara ri atas akta pendirian perusahaan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "SIJJK", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Surat ijin usaha penyedia jasa tenaga kerja", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "TDP (Tanda Daftar Perusahaan)", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Surat keterangan domisili perusahaan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Sertifikat kompetensi dan kualifikasi (SBU)", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Kartu tanda anggota asosiasi", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "NPWP", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Surat keterangan terdaftar wajib pajak", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Surat pengukuhan pengusaha kena pajak", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Surat keterangan/referensi bank dari bank BJB", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Izin usaha khusus", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Sertifikat ISO 9001 dan 45001", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false },
        { dokumen: "Nomor induk berusaha (NIB)", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: true },
        { dokumen: "Bukti bayar pajak/spt tahunan pph badan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "", isMandatory: false }
    ]);

    const handleInputChange = (index: number, field: keyof DokumenLegalitasData, value: string) => {
        setDokumenData(prev => prev.map((item, i) => 
            i === index ? { ...item, [field]: value } : item
        ));
    };

    const handleFileUpload = (index: number, file: File) => {
        setDokumenData(prev => prev.map((item, i) => 
            i === index ? { ...item, file, fileName: file.name } : item
        ));
        if (onFileUpload) {
            onFileUpload(dokumenData[index].dokumen, file);
        }
    };

    const handleFileDelete = (index: number) => {
        setDokumenData(prev => prev.map((item, i) => 
            i === index ? { ...item, file: null, fileName: "" } : item
        ));
        if (onFileDelete) {
            onFileDelete(dokumenData[index].dokumen);
        }
    };

    const handleFileView = (index: number) => {
        const item = dokumenData[index];
        if (onFileView && item.fileName) {
            onFileView(item.dokumen, item.fileName);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Legalitas</CardTitle>
                <CardDescription>
                    Upload dokumen legalitas perusahaan
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Information Alert */}
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                        <strong>*)</strong> Rekanan diwajibkan mengupload dokumen NIB dan SIJP perusahaan
                    </AlertDescription>
                </Alert>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Dokumen</TableHead>
                                <TableHead>Nomor Dokumen</TableHead>
                                <TableHead>Penerbit Dokumen</TableHead>
                                <TableHead>Tanggal Terbit</TableHead>
                                <TableHead>Tanggal Berakhir</TableHead>
                                <TableHead className="w-[200px]">Unggah Berkas</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dokumenData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {item.dokumen}
                                        {item.isMandatory && (
                                            <span className="text-red-500 ml-1">*</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.nomorDokumen}
                                            onChange={(e) => handleInputChange(index, 'nomorDokumen', e.target.value)}
                                            placeholder="Nomor dokumen"
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.penerbitDokumen}
                                            onChange={(e) => handleInputChange(index, 'penerbitDokumen', e.target.value)}
                                            placeholder="Penerbit dokumen"
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="date"
                                            value={item.tanggalTerbit}
                                            onChange={(e) => handleInputChange(index, 'tanggalTerbit', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="date"
                                            value={item.tanggalBerakhir}
                                            onChange={(e) => handleInputChange(index, 'tanggalBerakhir', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {!item.file ? (
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleFileUpload(index, file);
                                                        }}
                                                        className="hidden"
                                                    />
                                                    <Button variant="outline" size="sm" asChild>
                                                        <span>
                                                            <Upload className="h-3 w-3 mr-1" />
                                                            Browse PDF
                                                        </span>
                                                    </Button>
                                                </label>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleFileView(index)}
                                                    >
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleFileDelete(index)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        {item.fileName && (
                                            <p className="text-xs text-muted-foreground mt-1 truncate">
                                                {item.fileName}
                                            </p>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default DataLegalitasTable;