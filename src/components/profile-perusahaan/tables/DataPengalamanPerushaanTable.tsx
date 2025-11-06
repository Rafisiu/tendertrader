import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Eye, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DokumenPengalamanData {
    dokumen: string;
    nomorDokumen: string;
    penerbitDokumen: string;
    tanggalTerbit: string;
    tanggalBerakhir: string;
    file: File | null;
    fileName: string;
}

interface DataPengalamanPerusahaanTableProps {
    onFileUpload?: (dokumenName: string, file: File) => void;
    onFileDelete?: (dokumenName: string) => void;
    onFileView?: (dokumenName: string, fileName: string) => void;
}

const DataPengalamanPerusahaanTable: React.FC<DataPengalamanPerusahaanTableProps> = ({ 
    onFileUpload,
    onFileDelete,
    onFileView
}) => {
    const [dokumenData, setDokumenData] = useState<DokumenPengalamanData[]>([
        { dokumen: "Daftar Pengalaman Perusahaan", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "" },
        { dokumen: "Kontrak Pengalaman", nomorDokumen: "", penerbitDokumen: "", tanggalTerbit: "", tanggalBerakhir: "", file: null, fileName: "" }
    ]);

    const handleInputChange = (index: number, field: keyof DokumenPengalamanData, value: string) => {
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
                <CardTitle>Data Pengalaman Perusahaan</CardTitle>
                <CardDescription>
                    Upload dokumen pengalaman dan track record perusahaan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Dokumen</TableHead>
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

export default DataPengalamanPerusahaanTable;