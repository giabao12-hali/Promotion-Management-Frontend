'use client'

import DetailProductDialog from '@/components/products/components/detailProductDialog'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyIcon } from '@/components/ui/copy'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Indicator from '@/components/ui/indicator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { IPromotion } from '@/types/models/promotions/promotion.model'
import { formatDate } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import DetailPromotionDialog from './detailPromotionDialog'

interface PromotionDataCardProps {
    data: IPromotion[]
}

export default function PromotionDataCard({ data }: PromotionDataCardProps) {
    return (
        <div className='w-full'>
            <div className='grid gap-4 md:grid-cols-4'>
                {data.map((promotion) => (
                    <Card key={promotion.id} className={`${promotion.isActive ? 'border-muted-foreground/65' : 'border-black/5'}`}>
                        <CardHeader>
                            <CardTitle className={`${promotion.isActive ? '' : 'text-muted-foreground'}`}>
                                {promotion.code} - {promotion.name}
                            </CardTitle>
                            <CardDescription className={`${promotion.isActive ? '' : 'text-muted-foreground'}`}>
                                {promotion.description}
                            </CardDescription>
                            <CardAction>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant={'outline'} size={'icon-sm'}
                                            onClick={() => {
                                                navigator.clipboard.writeText(promotion.code)
                                                toast.success('Sao chép mã khuyến mãi thành công');
                                            }}
                                        >
                                            <CopyIcon />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Sao chép mã khuyến mãi</p>
                                    </TooltipContent>
                                </Tooltip>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className='text-sm space-y-2'>
                                <div className='flex justify-between'>
                                    <p className={`font-medium ${promotion.isActive ? '' : 'text-muted-foreground'}`}>Trạng thái:</p>
                                    <Indicator
                                        indicator={`${promotion.isActive ? '!bg-green-500' : '!bg-muted-foreground/50'}`}
                                        dot={`${promotion.isActive ? '!bg-green-500' : '!bg-muted-foreground/50'}`}
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <p className={`font-medium ${promotion.isActive ? '' : 'text-muted-foreground'}`}>Thời hạn sử dụng:</p>
                                    <p className={`flex items-center gap-2 ${promotion.isActive ? '' : 'text-muted-foreground'}`}>
                                        {formatDate(promotion.startDate, 'dd/MM/yyyy')} <ArrowRight size={12} /> {formatDate(promotion.endDate, 'dd/MM/yyyy')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={'outline'} className='w-full'>
                                        Xem chi tiết
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DetailPromotionDialog
                                        promotion={promotion}
                                    />
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
