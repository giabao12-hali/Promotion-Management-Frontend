import { CategoriesService } from "@/services/categories/category.service"
import { CreateUpdateCategoryDTO } from "@/types/models/categories/category.model"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCategories = {
    useGetAllCategories: () => {
        return useQuery({
            queryKey: ['get-categories'],
            queryFn: () => CategoriesService.getAllCategories(),
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
        })
    },
    useGetCategoryById: (id: string) => {
        return useQuery({
            queryKey: ['get-category', id],
            queryFn: () => CategoriesService.getCategoryById(id),
            enabled: !!id,
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
        })
    },
    useCreateCategory: () => {
        return useMutation({
            mutationFn: (payload: CreateUpdateCategoryDTO) => CategoriesService.createCategory(payload),
            onMutate: () => {
                toast.loading("Đang tạo danh mục...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Tạo danh mục thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Tạo danh mục thất bại. Vui lòng thử lại.");
                console.error("Create category error:", error);
            }
        })
    },
    useUpdateCategory: (id: string) => {
        return useMutation({
            mutationFn: (payload: CreateUpdateCategoryDTO) => CategoriesService.updateCategory(id, payload),
            onMutate: () => {
                toast.loading("Đang cập nhật danh mục...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Cập nhật danh mục thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Cập nhật danh mục thất bại. Vui lòng thử lại.");
                console.error("Update category error:", error);
            }
        })
    },
    useDeleteCategory: (id: string) => {
        return useMutation({
            mutationFn: () => CategoriesService.deleteCategory(id),
            onMutate: () => {
                toast.loading("Đang xóa danh mục...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Xóa danh mục thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Xóa danh mục thất bại. Vui lòng thử lại.");
                console.error("Delete category error:", error);
            }
        })
    }
}