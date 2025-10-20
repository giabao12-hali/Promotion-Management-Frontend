'use client'

import React from "react";
import { AddProductButton } from "./components/addProductButton";
import { useProduct } from "@/hooks/products/useProduct";
import ProductDataTable from "./components/ProductDataTable";
import { usePromotion } from "@/hooks/promotions/usePromotion";
import PromotionSliders from "../promotions/components/promotionSlider";


export default function ProductHomeComponent() {
    const { data: productsResponse, isLoading, error } = useProduct.useGetAllProducts();
    const {data: promotionsResponse } = usePromotion.useGetAllPromotions();
    const products = productsResponse || [];
    const promotions = promotionsResponse || [];

    if (isLoading) {
        return (
            <section className="p-4 w-full">
                <div className="text-center">Đang tải...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="p-4 w-full">
                <div className="text-center text-red-500">Có lỗi xảy ra khi tải danh sách sản phẩm</div>
            </section>
        );
    }

    return (
        <section className="p-4 w-full overflow-hidden">
            <div id="header" className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Danh sách sản phẩm</h1>
                <AddProductButton />
            </div>
            <div id="announcement-promotions">
                <PromotionSliders data={promotions} products={products}/>
            </div>
            <main id="body">
                <div className="mt-4">
                    <ProductDataTable data={products} />
                </div>
            </main>
        </section>
    )
}



