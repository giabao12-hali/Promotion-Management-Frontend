import { Badge } from '@/components/ui/badge'
import { NumberTicker } from '@/components/ui/number-ticker'
import { TrendingUp } from 'lucide-react'
import React from 'react'

export default function ActiveComponent() {
    return (
        <div className='px-2 space-y-4'>
            <div className='space-y-4'>
                <div className='flex items-center justify-between' id='header'>
                    <h1 className='text-muted-foreground font-medium'>
                        Mã khuyến mãi
                    </h1>
                    <Badge variant={'outline'}>
                        <TrendingUp />
                        +20%
                    </Badge>
                </div>
                <NumberTicker value={1234} className='text-2xl font-bold'/>
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <p>
                        Tăng 20% so với tháng trước
                    </p>
                    <TrendingUp size={16} />
                </div>
                <p className='text-sm text-muted-foreground/80'>
                    Số lượng mã khuyến mãi được sử dụng nhiều nhất trong tháng gần đây
                </p>
            </div>
        </div>
    )
}
