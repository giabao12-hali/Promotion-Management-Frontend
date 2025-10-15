'use client'

import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { IProduct } from '@/types/models/products/product.model'
import React from 'react'

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

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-600">Mã sản phẩm</label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">{product.code}</p>
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

            {product.description && (
                <div>
                    <label className="text-sm font-medium text-gray-600">Mô tả</label>
                    <p className="text-sm mt-1">{product.description}</p>
                </div>
            )}
        </div>
    )
}
