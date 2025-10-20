'use client'

import { Badge } from '@/components/ui/badge'
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { IPromotion } from '@/types/models/promotions/promotion.model'
import React, { useState } from 'react'
import { formatDate } from 'date-fns';
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IProduct } from '@/types/models/products/product.model'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ProductService } from '@/services/products/product.service'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CopyIcon } from '@/components/ui/copy'
import toast from 'react-hot-toast'
import { usePromotion } from '@/hooks/promotions/usePromotion'
import { Spinner } from '@/components/ui/spinner'

interface DetailPromotionApplyDialog {
    promotion: IPromotion
    product: IProduct[]
}

export default function DetailPromotionApplyDialog({ promotion, product }: DetailPromotionApplyDialog) {
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
    const [isLoadingProduct, setIsLoadingProduct] = useState(false)

    const handleProductSelect = async (productId: string) => {
        try {
            setIsLoadingProduct(true)
            const productDetail = await ProductService.getProductById(productId)
            setSelectedProduct(productDetail)
        } catch (error) {
            console.error('Error fetching product details:', error)
        } finally {
            setIsLoadingProduct(false)
        }
    }

    const addPromotionToProducts = usePromotion.useAddPromotionToProducts();
    return (
        <>
            <div className='space-y-4 w-full'>
                <DialogHeader>
                    <DialogTitle>
                        Chi tiết mã khuyến mãi
                    </DialogTitle>
                    <DialogDescription>
                        Thông tin chi tiết về mã khuyến mãi {promotion.code}
                    </DialogDescription>
                </DialogHeader>

                <div className='grid md:grid-cols-2 w-full'>
                    <div id='left' className='border-r border-solid pr-4 space-y-4'>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Mã khuyến mãi</label>
                                <div className="text-sm font-mono bg-gray-100 p-2 rounded flex items-center justify-between">
                                    <p>
                                        {promotion.code}
                                    </p>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CopyIcon
                                                size={14}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(promotion.code)
                                                    toast.success('Sao chép mã khuyến mãi thành công');
                                                }}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Sao chép mã khuyến mãi
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Tên khuyến mãi</label>
                                <p className="text-sm">{promotion.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Giảm giá</label>
                                <p className="text-sm font-semibold">
                                    {promotion.discountPercent}%
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                                <div className="mt-1">
                                    <Badge variant={promotion.isActive ? 'default' : 'secondary'}>
                                        {promotion.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Ngày bắt đầu</label>
                                <p className="text-sm">{formatDate(promotion.startDate, 'dd/MM/yyyy')}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Ngày kết thúc</label>
                                <p className="text-sm">{formatDate(promotion.endDate, 'dd/MM/yyyy')}</p>
                            </div>
                        </div>

                        {promotion.description && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Mô tả</label>
                                <p className="text-sm mt-1">{promotion.description}</p>
                            </div>
                        )}

                        <Separator />
                        <div className='w-full'>
                            <Label className='mb-2' htmlFor="product-select">Sản phẩm áp dụng</Label>
                            <Select onValueChange={handleProductSelect}>
                                <SelectTrigger className='w-full' id="product-select">
                                    <SelectValue placeholder="Chọn sản phẩm áp dụng" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {product.map((prod) => (
                                            <SelectItem
                                                value={prod.id}
                                                key={prod.id}
                                            >
                                                {prod.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div id='right' className='space-y-4 pl-4'>
                        {isLoadingProduct ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-gray-500">Đang tải thông tin sản phẩm...</p>
                            </div>
                        ) : selectedProduct ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Mã sản phẩm</label>
                                        <div className="text-sm font-mono bg-gray-100 p-2 rounded flex items-center justify-between">
                                            <p>
                                                {selectedProduct.code}
                                            </p>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CopyIcon
                                                        size={14}
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(selectedProduct.code)
                                                            toast.success('Sao chép mã sản phẩm thành công');
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Sao chép mã sản phẩm
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Tên sản phẩm</label>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="text-sm line-clamp-2">{selectedProduct.name}</p>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {selectedProduct.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Danh mục</label>
                                        <p className="text-sm">{selectedProduct.category?.name || 'Không có danh mục'}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Giá</label>
                                        <p className="text-sm font-semibold">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(selectedProduct.price)}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                                        <div className="mt-1">
                                            <Badge variant={selectedProduct.isActive ? 'default' : 'secondary'}>
                                                {selectedProduct.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
                                        <p className="text-sm">{new Date(selectedProduct.createdAt).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className='w-full space-y-2 text-sm'>
                                    <div id='rootPrice' className='flex items-center justify-between'>
                                        <p className='font-medium'>Giá gốc:</p>
                                        <p className='font-semibold'>
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(selectedProduct.price)}
                                        </p>
                                    </div>
                                    <div id='promotions' className='flex items-center justify-between'>
                                        <p className='font-medium'>Khuyến mãi:</p>
                                        <p className='font-semibold text-green-600'>
                                            -{promotion.discountPercent}%
                                        </p>
                                    </div>
                                    <div id='totalPrice' className='flex items-center justify-between'>
                                        <p className='font-medium'>Giá sau khuyến mãi:</p>
                                        <p className='font-semibold'>
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(selectedProduct.price * (1 - promotion.discountPercent / 100))}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-gray-500">Vui lòng chọn sản phẩm để xem chi tiết</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Separator />
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Đóng</Button>
                </DialogClose>
                <Button
                    disabled={!selectedProduct}
                    onClick={() => {
                        if (selectedProduct) {
                            addPromotionToProducts.mutate({
                                promotionId: promotion.id,
                                productIds: [selectedProduct.id]
                            })
                        }
                    }}
                >
                    {addPromotionToProducts.isPending && <Spinner/>}
                    Áp dụng
                </Button>
            </DialogFooter>
        </>
    )
}