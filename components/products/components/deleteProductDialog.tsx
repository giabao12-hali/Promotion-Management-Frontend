'use client'

import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useProduct } from '@/hooks/products/useProduct'
import { IProduct } from '@/types/models/products/product.model'
import React from 'react'

interface DeleteProductDialogProps {
    product: IProduct
}

export default function DeleteProductDialog(
    {
        product
    }: DeleteProductDialogProps
) {
    const deleteProduct = useProduct.useDeleteProduct(product.id);

    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Bạn có chắc chắn muốn xóa sản phẩm {product.name} không?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Hành động này không thể hoàn tác. Tất cả các dữ liệu liên quan đến sản phẩm sẽ bị xóa vĩnh viễn.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Hủy
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteProduct.mutate()}>
                    Xóa sản phẩm
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    )
}
