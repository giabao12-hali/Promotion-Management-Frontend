import api from "@/lib/axiosConfig";
import { Category, CreateUpdateCategoryDTO } from "@/types/models/categories/category.model";

export const CategoriesService = {
    getAllCategories: async (): Promise<Category[]> => {
        try {
            const res = await api.get<Category[]>("/api/Category");
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    getCategoryById: async (id: string): Promise<Category | null> => {
        try {
            const res = await api.get<Category>(`/api/Category/${id}`);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    createCategory: async (data: CreateUpdateCategoryDTO): Promise<Category> => {
        try {
            const res = await api.post<Category>("/api/Category", data);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    updateCategory: async (id: string, data: CreateUpdateCategoryDTO): Promise<Category | null> => {
        try {
            const res = await api.put<Category>(`/api/Category/${id}`, data);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    deleteCategory: async (id: string): Promise<void> => {
        try {
            await api.delete(`/api/Category/${id}`);
        } catch (error: unknown) {
            throw error;
        }
    }
}