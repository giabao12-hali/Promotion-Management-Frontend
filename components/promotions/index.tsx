'use client'

import React from 'react'
import AddPromotionButton from './components/addPromotionButton'
import PromotionDataCard from './components/promotionDataCard'
import { usePromotion } from '@/hooks/promotions/usePromotion';

export default function PromotionHomeComponent() {
    const { data: promotionsResponse, isLoading, error } = usePromotion.useGetAllPromotions();
    const promotions = promotionsResponse || [];

    console.log('promotions', promotions);

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
                <div className="text-center text-red-500">Có lỗi xảy ra khi tải danh sách mã khuyến mãi</div>
            </section>
        );
    }

    return (
        <div className='p-4 w-full'>
            <div id="header" className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Danh sách mã khuyến mãi</h1>
                <AddPromotionButton />
            </div>
            <main id='body'>
                <div className='mt-4'>
                    <PromotionDataCard
                        data={promotions}
                    />
                </div>
            </main>
        </div>
    )
}
