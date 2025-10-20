'use client';

import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IPromotion } from '@/types/models/promotions/promotion.model';
import { Ticket } from 'lucide-react';
import React from 'react'
import DetailPromotionApplyDialog from './detailPromotionApplyDialog';
import { IProduct } from '@/types/models/products/product.model';

interface PromotionSliderProps {
    data: IPromotion[]
    products: IProduct[]
}

export default function PromotionSliders(
    { data, products }: PromotionSliderProps
) {
    return (
        <div className="my-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-md p-2">
            <span className="text-sm font-semibold text-amber-700 flex items-center gap-2">
                <Ticket size={16} />
                Ưu đãi hiện hành:
            </span>
            <div className="flex flex-wrap gap-2 items-center">
                {data.slice(0, 8).map(promotion => (
                    <Dialog key={promotion.id}>
                        <DialogTrigger>
                            <Badge
                                className="bg-amber-100 text-amber-700 border-amber-200 cursor-pointer hover:bg-amber-200 transition-all duration-300"
                            >
                                {promotion.code} - {promotion.name}
                            </Badge>
                        </DialogTrigger>
                        <DialogContent className='md:max-w-3xl'>
                            <DetailPromotionApplyDialog
                                promotion={promotion}
                                product={products}
                            />
                        </DialogContent>
                    </Dialog>
                ))}
                {data.length > 8 && (
                    <Badge
                        variant="outline"
                        className="cursor-pointer border-amber-300 text-amber-700 hover:bg-amber-50"
                        title={data.slice(8).map(p => `${p.code} - ${p.name}`).join('\n')}
                    >
                        +{data.length - 8} ưu đãi
                    </Badge>
                )}
            </div>
        </div>

    )
}
