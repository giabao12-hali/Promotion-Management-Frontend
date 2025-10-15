import { ProductService } from "@/services/products/product.service"
import { CreateUpdateProductDTO } from "@/types/models/products/product.model"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useProduct = {
    useGetAllProducts: () => {
        return useQuery({
            queryKey: ['get-products'],
            queryFn: () => ProductService.getAllProducts(),
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
        })
    },
    useGetProductById: (id: string) => {
        return useQuery({
            queryKey: ['get-product', id],
            queryFn: () => ProductService.getProductById(id),
            enabled: !!id,
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
        })
    },
    useCreateProduct: () => {
        return useMutation({
            mutationFn: (payload: CreateUpdateProductDTO) => ProductService.createProduct(payload),
            onMutate: () => {
                toast.loading("Đang tạo sản phẩm...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Tạo sản phẩm thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Tạo sản phẩm thất bại. Vui lòng thử lại.");
                console.error("Create product error:", error);
            }
        })
    },
    useUpdateProduct: (id: string) => {
        return useMutation({
            mutationFn: (payload: CreateUpdateProductDTO) => ProductService.updateProduct(id, payload),
            onMutate: () => {
                toast.loading("Đang cập nhật sản phẩm...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Cập nhật sản phẩm thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Cập nhật sản phẩm thất bại. Vui lòng thử lại.");
                console.error("Update product error:", error);
            }
        })
    },
    useDeleteProduct: (id: string) => {
        return useMutation({
            mutationFn: () => ProductService.deleteProduct(id),
            onMutate: () => {
                toast.loading("Đang xóa sản phẩm...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Xóa sản phẩm thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Xóa sản phẩm thất bại. Vui lòng thử lại.");
                console.error("Delete product error:", error);
            }
        })
    }
}