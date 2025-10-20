'use client'

import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { IProduct } from '@/types/models/products/product.model'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CopyIcon } from '@/components/ui/copy'
import { toast } from 'react-hot-toast'

interface DetailProductDialogProps {
    product: IProduct
}

export default function DetailProductDialog({ product }: DetailProductDialogProps) {
    return (
        <div className="space-y-4">
            <DialogHeader>
                <DialogTitle>Chi tiết sản phẩm</DialogTitle>
                <DialogDescription>
                    Thông tin chi tiết về sản phẩm {product.name}
                </DialogDescription>
            </DialogHeader>

            <div className='grid md:grid-cols-2 w-full'>
                <div id='left' className='border-r border-solid pr-4 space-y-4'>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Mã sản phẩm</label>
                            <div className="text-sm font-mono bg-gray-100 p-2 rounded flex items-center justify-between">
                                <p>
                                    {product.code}
                                </p>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CopyIcon
                                            size={14}
                                            onClick={() => {
                                                navigator.clipboard.writeText(product.code)
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
                            <p className="text-sm">{product.name}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Danh mục</label>
                            <p className="text-sm">{product.category?.name || 'Không có danh mục'}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Giá</label>
                            <p className="text-sm font-semibold">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(product.price)}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                            <div className="mt-1">
                                <Badge variant={product.isActive ? 'default' : 'secondary'}>
                                    {product.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
                            <p className="text-sm">{new Date(product.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </div>
                </div>
                <div id='right' className='space-y-4 pl-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Mã khuyến mãi</label>
                            <div className="text-sm font-mono bg-gray-100 p-2 rounded flex items-center justify-between">
                                <p>
                                    {product.appliedPromotionCode}
                                </p>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CopyIcon
                                            size={14}
                                            onClick={() => {
                                                navigator.clipboard.writeText(product.appliedPromotionCode)
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
                            <label className="text-sm font-medium text-gray-600">Số tiền đã giảm giá</label>
                            <p className="text-sm font-semibold">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(product.finalPrice)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {product.description && (
                <div>
                    <label className="text-sm font-medium text-gray-600">Mô tả</label>
                    <p className="text-sm mt-1">{product.description}</p>
                </div>
            )}
        </div>
    )
}
