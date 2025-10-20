import { Category } from "../categories/category.model";

export interface IProduct {
    id: string;
    name: string;
    code: string;
    description: string;
    price: number;
    finalPrice: number;
    appliedPromotionCode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface CreateUpdateProductDTO {
    name: string;
    code: string;
    description: string;
    price: number;
    isActive: boolean;
    categoryId: string;
}