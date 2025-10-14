'use client'

import { Badge } from '@/components/ui/badge'
import { NumberTicker } from '@/components/ui/number-ticker'
import { TrendingDown } from 'lucide-react'
import React from 'react'

export default function CustomerComponent() {
    return (
        <div className='px-2 space-y-4'>
            <div className='space-y-4'>
                <div className='flex items-center justify-between' id='header'>
                    <h1 className='text-muted-foreground font-medium'>
                        Khách hàng
                    </h1>
                    <Badge variant={'outline'}>
                        <TrendingDown />
                        -20%
                    </Badge>
                </div>
                <NumberTicker value={1234} className='text-2xl font-bold'/>
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <p>
                        Giảm 20% so với tháng trước
                    </p>
                    <TrendingDown size={16} />
                </div>
                <p className='text-sm text-muted-foreground/80'>
                    Cần cải thiện trải nghiệm khách hàng
                </p>
            </div>
        </div>
    )
}
