export interface IPromotion {
    id: string;
    code: string;
    name: string;
    description: string;
    discountPercent: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

export interface CreateUpdatePromotionDTO {
    name: string;
    code: string;
    description: string;
    discountPercent: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

export interface ApplyPromotionDTO {
    promotionCode: string;
    productId: string;
}

export interface AddPromotionToProductDTO {
    promotionId: string;
    productIds: string[]
}
