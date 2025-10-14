'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react'

export default function CustomerChartComponent() {
    return (
        <div className='space-y-4'>
            {Array.from({ length: 6 }).map((_, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='space-y-1'>
                            <p className='text-sm font-medium leading-none'>Nhân viên</p>
                            <p className='text-xs text-muted-foreground'>email của nhân viên</p>
                        </div>
                    </div>
                    <div className='text-right'>
                        <Badge variant={'default'}>
                            Đang kích hoạt
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    )
}
