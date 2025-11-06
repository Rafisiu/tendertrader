import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search, X, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PicData } from '@/types/profile';

interface PicTableProps {
    data: PicData[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

const PicTable: React.FC<PicTableProps> = ({ 
    data, 
    onEdit, 
    onDelete, 
    onAdd 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Filter dan pagination logic
    const filteredData = useMemo(() => {
        return data.filter(item => 
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Reset page when search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Person In Charge (PIC)</CardTitle>
                    <CardDescription>
                        Kelola data person in charge perusahaan
                    </CardDescription>
                </div>
                <Button onClick={onAdd}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Tambah PIC
                </Button>
            </CardHeader>
            <CardContent>
                {/* Search and Controls */}
                <div className="mb-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Cari nama, email, atau jabatan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Items per page */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Show</span>
                            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                                <SelectTrigger className="w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">entries</span>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">No</TableHead>
                                <TableHead>Nama Lengkap</TableHead>
                                <TableHead>Jabatan</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telepon</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        {searchTerm ? 
                                            `Tidak ada data yang ditemukan untuk "${searchTerm}"` :
                                            'Belum ada data PIC. Klik "Tambah PIC" untuk menambahkan data.'
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((pic, index) => (
                                    <TableRow key={pic.id}>
                                        <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                                        <TableCell className="font-medium">{pic.nama}</TableCell>
                                        <TableCell>{pic.jabatan}</TableCell>
                                        <TableCell>{pic.email}</TableCell>
                                        <TableCell>{pic.telepon}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => onEdit(pic.id)}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => onDelete(pic.id)}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default PicTable;