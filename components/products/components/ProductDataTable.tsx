'use client'

import React, { useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { IProduct } from '@/types/models/products/product.model'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import toast from 'react-hot-toast'
import DetailProductDialog from './detailProductDialog'
import DeleteProductDialog from './deleteProductDialog'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import UpdateProductDialog from './updateProductDialog'
import { IPromotion } from '@/types/models/promotions/promotion.model'
import { Category } from '@/types/models/categories/category.model'

interface ProductDataTableProps {
    data: IProduct[]
    promotions: IPromotion[];
    category: Category[]
}

const ProductActions = ({ product, promotions, categories }: { product: IProduct, promotions: IPromotion[], categories: Category[] }) => {
    const [open, setOpen] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Mở menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        navigator.clipboard.writeText(product.code)
                        toast.success("Đã sao chép mã sản phẩm vào clipboard!")
                    }}
                >
                    Copy Code
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className='md:max-w-3xl'>
                        <DetailProductDialog
                            product={product}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className='md:max-w-3xl'>
                        <UpdateProductDialog
                            product={product}
                            promotions={promotions}
                            categories={categories}
                        />
                    </DialogContent>
                </Dialog>
                <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <DeleteProductDialog
                            product={product}
                        />
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns = (promotions: IPromotion[], categories: Category[]): ColumnDef<IProduct>[] => [
    {
        accessorKey: 'code',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Mã sản phẩm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue('code')}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tên sản phẩm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'category',
        header: 'Danh mục',
        cell: ({ row }) => {
            const category = row.getValue('category') as { name?: string } | null
            return <div>{category?.name || 'Không có danh mục'}</div>
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Giá
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(price)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'finalPrice',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Giá sau giảm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('finalPrice'))
            const formatted = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(price)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'appliedPromotionCode',
        header: 'Mã khuyến mãi',
        cell: ({ row }) => {
            const code = row.getValue('appliedPromotionCode') as string
            return <div>{code || 'Không có'}</div>
        },
    },
    {
        accessorKey: 'isActive',
        header: 'Trạng thái',
        cell: ({ row }) => {
            const isActive = row.getValue('isActive') as boolean
            return (
                <Badge variant={isActive ? 'default' : 'secondary'}>
                    {isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            return <div>{date.toLocaleDateString('vi-VN')}</div>
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original
            return <ProductActions product={product} promotions={promotions} categories={categories} />
        },
    },
]

export default function ProductDataTable({ data, promotions, category }: ProductDataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns: columns(promotions, category),
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border space-y-4 p-4">
                <Input
                    placeholder="Tìm kiếm theo tên sản phẩm..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('name')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}