'use client'

import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { ArrowUpRightIcon, Code } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Page() {
    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant={'icon'}>
                        <Code />
                    </EmptyMedia>
                    <EmptyTitle>
                        Đã có lỗi xảy ra
                    </EmptyTitle>
                    <EmptyDescription>
                        Có vẻ như lập trình viên của chúng tôi đã để quên một số thứ ở đây. Hãy thử tải lại trang.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className='flex gap-2'>
                        <Button
                            variant={'outline'}
                            asChild
                        >
                            <Link href={'/dashboard'}>
                                Quay về trang chủ
                            </Link>
                        </Button>
                        <Button
                            variant={'outline'}
                            asChild
                        >
                            <Link href={'#'}>
                                Khám phá mã nguồn
                            </Link>
                        </Button>
                    </div>
                </EmptyContent>
                <Button
                    variant={'link'}
                    asChild
                    className='text-muted-foreground'
                    size={'sm'}
                >
                    <Link href={'/'}>
                        Tìm hiểu thêm
                        <ArrowUpRightIcon />
                    </Link>
                </Button>
            </Empty>
        </div>
    )
}
