import api from "@/lib/axiosConfig";
import { CreateUpdatePromotionDTO, IPromotion } from "@/types/models/promotions/promotion.model";

export const PromotionService = {
    getAllPromotions: async (): Promise<IPromotion[]> => {
        try {
            const res = await api.get<IPromotion[]>("/api/Promotion");
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    getPromotionById: async (id: string): Promise<IPromotion> => {
        try {
            const res = await api.get<IPromotion>(`/api/Promotion/${id}`);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    createPromotion: async (payload: CreateUpdatePromotionDTO): Promise<IPromotion> => {
        try {
            const res = await api.post<IPromotion>("/api/Promotion", payload);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    updatePromotion: async (id: string, payload: CreateUpdatePromotionDTO): Promise<IPromotion> => {
        try {
            const res = await api.put<IPromotion>(`/api/Promotion/${id}`, payload);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    deletePromotion: async (id: string): Promise<void> => {
        try {
            await api.delete(`/api/Promotion/${id}`);
        } catch (error: unknown) {
            throw error;
        }
    }
}