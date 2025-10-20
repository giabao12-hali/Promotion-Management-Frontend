'use client'

import { Badge } from '@/components/ui/badge'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { IPromotion } from '@/types/models/promotions/promotion.model'
import React from 'react'
import { formatDate } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CopyIcon } from '@/components/ui/copy'
import { toast } from 'react-hot-toast'

interface DetailPromotionDialogProps {
    promotion: IPromotion
}

export default function DetailPromotionDialog({ promotion }: DetailPromotionDialogProps) {
    return (
        <div className='space-y-4'>
            <DialogHeader>
                <DialogTitle>
                    Chi tiết mã khuyến mãi
                </DialogTitle>
                <DialogDescription>
                    Thông tin chi tiết về mã khuyến mãi {promotion.code}
                </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-600">Mã khuyến mãi</label>
                    <div className="text-sm font-mono bg-gray-100 p-2 rounded flex items-center justify-between">
                        <p>
                            {promotion.code}
                        </p>
                        <Tooltip>
                            <TooltipTrigger>
                                <CopyIcon
                                    size={14}
                                    onClick={() => {
                                        navigator.clipboard.writeText(promotion.code)
                                        toast.success('Sao chép mã khuyến mãi thành công');
                                    }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                Sao chép mã khuyến mãi
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Tên khuyến mãi</label>
                    <p className="text-sm">{promotion.name}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Giảm giá</label>
                    <p className="text-sm font-semibold">
                        {promotion.discountPercent}%
                    </p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                    <div className="mt-1">
                        <Badge variant={promotion.isActive ? 'default' : 'secondary'}>
                            {promotion.isActive ? 'Hoạt động' : 'Không hoạt động'}
                        </Badge>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Ngày bắt đầu</label>
                    <p className="text-sm">{formatDate(promotion.startDate, 'dd/MM/yyyy')}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Ngày kết thúc</label>
                    <p className="text-sm">{formatDate(promotion.endDate, 'dd/MM/yyyy')}</p>
                </div>
            </div>

            {promotion.description && (
                <div>
                    <label className="text-sm font-medium text-gray-600">Mô tả</label>
                    <p className="text-sm mt-1">{promotion.description}</p>
                </div>
            )}
        </div>
    )
}
