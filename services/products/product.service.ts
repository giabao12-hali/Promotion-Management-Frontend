import api from "@/lib/axiosConfig"
import { CreateUpdateProductDTO, IProduct } from "@/types/models/products/product.model";

export const ProductService = {
    getAllProducts: async (): Promise<IProduct[]> => {
        try {
            const res = await api.get<IProduct[]>("/api/Product")
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    getProductById: async (id: string): Promise<IProduct> => {
        try {
            const res = await api.get<IProduct>(`/api/Product/${id}`);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    createProduct: async (payload: CreateUpdateProductDTO) => {
        try {
            const res = await api.post("/api/Product", payload);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    updateProduct: async (id: string, payload: CreateUpdateProductDTO) => {
        try {
            const res = await api.put(`/api/Product/${id}`, payload);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
    deleteProduct: async (id: string) => {
        try {
            const res = await api.delete(`/api/Product/${id}`);
            return res.data;
        } catch (error: unknown) {
            throw error;
        }
    },
}