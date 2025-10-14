'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ArrowRight, TrendingUp } from 'lucide-react'
import React from 'react'

export default function TotalRevenueComponent() {
    return (
        <div className='px-2 space-y-4'>
            <div className='space-y-4'>
                <div className='flex items-center justify-between' id='header'>
                    <h1 className='text-muted-foreground font-medium'>
                        Tổng doanh thu
                    </h1>
                    <Badge variant={'outline'}>
                        <TrendingUp />
                        +12.4%
                    </Badge>
                </div>
                <div className='text-2xl font-bold flex items-baseline gap-1'>
                    <NumberTicker value={1234567890} />
                    <p>VND</p>
                </div>
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <p>
                        Tăng trưởng 20% so với tháng trước
                    </p>
                    <TrendingUp size={16} />
                </div>
                <p className='text-sm text-muted-foreground/80'>
                    Được quan tâm nhiều nhất trong 6 tháng gần đây
                </p>
            </div>
            <div className='flex items-center justify-end'>
                <Button
                    size={'sm'}
                    variant={'outline'}
                >
                    <ArrowRight size={16} />
                    Xem chi tiết
                </Button>
            </div>
        </div>
    )
}
