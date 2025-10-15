import { IProduct } from "../products/product.model";

export interface Category {
    id: string;
    code: string;
    name: string;
    description: string;
    parentId: string;
    parent: string;
    children: string;
    products: IProduct[];
}

export interface CreateUpdateCategoryDTO {
    code: string;
    name: string;
    description: string;
    parentId: string;
}