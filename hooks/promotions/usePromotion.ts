import { PromotionService } from "@/services/promotions/promotion.service"
import { AddPromotionToProductDTO, CreateUpdatePromotionDTO } from "@/types/models/promotions/promotion.model"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const usePromotion = {
    useGetAllPromotions: () => {
        return useQuery({
            queryKey: ['get-promotions'],
            queryFn: () => PromotionService.getAllPromotions(),
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
        })
    },
    useGetPromotionById: (id: string) => {
        return useQuery({
            queryKey: ['get-promotion', id],
            queryFn: () => PromotionService.getPromotionById(id),
            enabled: !!id,
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
        })
    },
    useCreatePromotion: () => {
        return useMutation({
            mutationFn: (payload: CreateUpdatePromotionDTO) => PromotionService.createPromotion(payload),
            onMutate: () => {
                toast.loading("Đang tạo mã khuyến mãi...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Tạo mã khuyến mãi thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Tạo mã khuyến mãi thất bại. Vui lòng thử lại.");
                console.error("Create promotion error:", error);
            }
        })
    },
    useUpdatePromotion: (id: string) => {
        return useMutation({
            mutationFn: (payload: CreateUpdatePromotionDTO) => PromotionService.updatePromotion(id, payload),
            onMutate: () => {
                toast.loading("Đang cập nhật mã khuyến mãi...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Cập nhật mã khuyến mãi thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Cập nhật mã khuyến mãi thất bại. Vui lòng thử lại.");
                console.error("Update promotion error:", error);
            }
        })
    },
    useDeletePromotion: (id: string) => {
        return useMutation({
            mutationFn: () => PromotionService.deletePromotion(id),
            onMutate: () => {
                toast.loading("Đang xóa mã khuyến mãi...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Xóa mã khuyến mãi thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Xóa mã khuyến mãi thất bại. Vui lòng thử lại.");
                console.error("Delete promotion error:", error);
            }
        })
    },
    useAddPromotionToProducts: () => {
        return useMutation({
            mutationFn: (payload: AddPromotionToProductDTO) => PromotionService.addPromotionToProducts(payload.promotionId, payload.productIds),
            onMutate: () => {
                toast.loading("Đang thêm mã khuyến mãi vào sản phẩm...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Thêm mã khuyến mãi vào sản phẩm thành công!");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error("Thêm mã khuyến mãi vào sản phẩm thất bại. Vui lòng thử lại.");
                console.error("Add promotion to products error:", error);
            }
        })
    }
}