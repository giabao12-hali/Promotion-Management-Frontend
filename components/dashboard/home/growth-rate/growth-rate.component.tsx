'use client'

import { Badge } from '@/components/ui/badge'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Equal } from 'lucide-react'
import React from 'react'

export default function GrowthRateComponent() {
    return (
        <div className='px-2 space-y-4'>
            <div className='space-y-4'>
                <div className='flex items-center justify-between' id='header'>
                    <h1 className='text-muted-foreground font-medium'>
                        Sản phẩm
                    </h1>
                    <Badge variant={'outline'}>
                        <Equal />
                        20%
                    </Badge>
                </div>
                <NumberTicker value={1234} className='text-2xl font-bold'/>
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <p>
                        Không thay đổi so với tháng trước
                    </p>
                </div>
                <p className='text-sm text-muted-foreground/80'>
                    Số lượng sản phẩm đã áp dụng mã khuyến mãi không thay đổi trong tháng gần đây
                </p>
            </div>
        </div>
    )
}
