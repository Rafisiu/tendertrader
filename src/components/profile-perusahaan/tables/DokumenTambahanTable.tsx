import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Eye, Trash2, PlusCircle, X } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DokumenTambahanData {
    id: number;
    dokumen: string;
    nomorDokumen: string;
    penerbitDokumen: string;
    tanggalTerbit: string;
    tanggalBerakhir: string;
    file: File | null;
    fileName: string;
}

interface DokumenTambahanTableProps {
    onFileUpload?: (id: number, dokumenName: string, file: File) => void;
    onFileDelete?: (id: number, dokumenName: string) => void;
    onFileView?: (id: number, dokumenName: string, fileName: string) => void;
    onRowDelete?: (id: number) => void;
}

const DokumenTambahanTable: React.FC<DokumenTambahanTableProps> = ({ 
    onFileUpload,
    onFileDelete,
    onFileView,
    onRowDelete
}) => {
    const [dokumenData, setDokumenData] = useState<DokumenTambahanData[]>([]);
    const [nextId, setNextId] = useState(1);

    const handleAddRow = () => {
        const newDokumen: DokumenTambahanData = {
            id: nextId,
            dokumen: "",
            nomorDokumen: "",
            penerbitDokumen: "",
            tanggalTerbit: "",
            tanggalBerakhir: "",
            file: null,
            fileName: ""
        };
        setDokumenData(prev => [...prev, newDokumen]);
        setNextId(prev => prev + 1);
    };

    const handleDeleteRow = (id: number) => {
        setDokumenData(prev => prev.filter(item => item.id !== id));
        if (onRowDelete) {
            onRowDelete(id);
        }
    };

    const handleInputChange = (id: number, field: keyof DokumenTambahanData, value: string) => {
        setDokumenData(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleFileUpload = (id: number, file: File) => {
        setDokumenData(prev => prev.map(item => 
            item.id === id ? { ...item, file, fileName: file.name } : item
        ));
        
        const dokumen = dokumenData.find(item => item.id === id);
        if (onFileUpload && dokumen) {
            onFileUpload(id, dokumen.dokumen, file);
        }
    };

    const handleFileDelete = (id: number) => {
        setDokumenData(prev => prev.map(item => 
            item.id === id ? { ...item, file: null, fileName: "" } : item
        ));
        
        const dokumen = dokumenData.find(item => item.id === id);
        if (onFileDelete && dokumen) {
            onFileDelete(id, dokumen.dokumen);
        }
    };

    const handleFileView = (id: number) => {
        const item = dokumenData.find(doc => doc.id === id);
        if (onFileView && item && item.fileName) {
            onFileView(id, item.dokumen, item.fileName);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Dokumen Tambahan</CardTitle>
                    <CardDescription>
                        Tambahkan dokumen tambahan yang diperlukan untuk proses registrasi
                    </CardDescription>
                </div>
                <Button onClick={handleAddRow}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Tambah Dokumen
                </Button>
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
                                <TableHead className="w-[80px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dokumenData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        Belum ada dokumen tambahan. Klik "Tambah Dokumen" untuk menambahkan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                dokumenData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Input
                                                value={item.dokumen}
                                                onChange={(e) => handleInputChange(item.id, 'dokumen', e.target.value)}
                                                placeholder="Nama dokumen"
                                                className="w-full"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={item.nomorDokumen}
                                                onChange={(e) => handleInputChange(item.id, 'nomorDokumen', e.target.value)}
                                                placeholder="Nomor dokumen"
                                                className="w-full"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={item.penerbitDokumen}
                                                onChange={(e) => handleInputChange(item.id, 'penerbitDokumen', e.target.value)}
                                                placeholder="Penerbit dokumen"
                                                className="w-full"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="date"
                                                value={item.tanggalTerbit}
                                                onChange={(e) => handleInputChange(item.id, 'tanggalTerbit', e.target.value)}
                                                className="w-full"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="date"
                                                value={item.tanggalBerakhir}
                                                onChange={(e) => handleInputChange(item.id, 'tanggalBerakhir', e.target.value)}
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
                                                                if (file) handleFileUpload(item.id, file);
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
                                                            onClick={() => handleFileView(item.id)}
                                                        >
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleFileDelete(item.id)}
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
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteRow(item.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {dokumenData.length > 0 && (
                    <div className="mt-4 text-sm text-muted-foreground">
                        Total dokumen tambahan: {dokumenData.length}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DokumenTambahanTable;