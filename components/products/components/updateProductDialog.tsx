'use client';

import { Badge } from '@/components/ui/badge';
import { CopyIcon } from '@/components/ui/copy';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IProduct } from '@/types/models/products/product.model';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IPromotion } from '@/types/models/promotions/promotion.model';
import { PromotionService } from '@/services/promotions/promotion.service';
import { formatDate } from 'date-fns';
import { usePromotion } from '@/hooks/promotions/usePromotion';
import { Spinner } from '@/components/ui/spinner';
import { useProduct } from '@/hooks/products/useProduct';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CategoriesSelect } from './selectCategories';
import { Category } from '@/types/models/categories/category.model';
import { Switch } from '@/components/ui/switch';
import { AutosizeTextarea } from '@/components/ui/textarea-autosize';
import { FieldLegend } from '@/components/ui/field';

interface UpdateProductDialogProps {
    product: IProduct
    promotions: IPromotion[]
    categories: Category[]
}

const productForm = z.object({
    name: z.string().min(1, "Tên sản phẩm không được để trống"),
    code: z.string().min(1, "Mã sản phẩm không được để trống"),
    description: z.string().optional(),
    price: z.number().min(0, "Giá sản phẩm phải lớn hơn hoặc bằng 0"),
    isActive: z.boolean(),
    categoryId: z.string().min(1, "Danh mục sản phẩm không được để trống"),
    promotionIds: z.array(z.string()),
})

export default function UpdateProductDialog(
    {
        product,
        promotions,
        categories
    }: UpdateProductDialogProps
) {
    const form = useForm<z.infer<typeof productForm>>({
        resolver: zodResolver(productForm),
        defaultValues: {
            name: product.name,
            code: product.code,
            description: product.description,
            price: product.price,
            isActive: product.isActive,
            categoryId: product.category?.id || '',
            promotionIds: product.promotion?.id ? [product.promotion.id] : [],
        }
    });

    const updateProduct = useProduct.useUpdateProduct(product.id);

    function onSubmit(values: z.infer<typeof productForm>) {
        console.log("Form values:", values);
        updateProduct.mutate({
            ...values,
            description: values.description || ''
        });
    }

    const [selectedPromotion, setSelectedPromotion] = useState<IPromotion | null>(null)
    const [isLoadingPromotion, setIsLoadingPromotion] = useState(false)

    useEffect(() => {
        if (product.promotion) {
            setSelectedPromotion(product.promotion)
        }
    }, [product])

    const handlePromotionSelect = async (promotionId: string) => {
        try {
            setIsLoadingPromotion(true)
            const promotionDetail = await PromotionService.getPromotionById(promotionId)
            setSelectedPromotion(promotionDetail)
            // Thay thế promotion cũ bằng promotion mới (chỉ giữ 1 phần tử)
            form.setValue('promotionIds', [promotionId], { shouldValidate: true })
        } catch (error) {
            console.error('Error fetching promotion details:', error)
        } finally {
            setIsLoadingPromotion(false)
        }
    }

    return (
        <>
            <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Cập nhật sản phẩm</DialogTitle>
                        <DialogDescription>
                            Thông tin chi tiết về sản phẩm {product.name}
                        </DialogDescription>
                    </DialogHeader>

                    <form className='grid md:grid-cols-2 w-full'>
                        <div id='left' className='border-r border-solid pr-4 space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='code'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Mã sản phẩm
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Nhập mã sản phẩm'
                                                        required
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tên sản phẩm
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        required
                                                        placeholder='Nhập tên sản phẩm'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='categoryId'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Danh mục sản phẩm
                                                </FormLabel>
                                                <FormControl>
                                                    <CategoriesSelect
                                                        data={categories}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='price'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Giá tiền
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='number'
                                                        placeholder='Nhập giá tiền'
                                                        {...field}
                                                        required
                                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='isActive'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Hoạt động?
                                                </FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name='promotionIds'
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>
                                                    Mã khuyến mãi
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={handlePromotionSelect}
                                                        defaultValue={product.promotion?.id}
                                                    >
                                                        <SelectTrigger className='w-full' id="promotion-select">
                                                            <SelectValue placeholder="Chọn mã khuyến mãi" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {promotions.map((promo) => (
                                                                    <SelectItem
                                                                        value={promo.id}
                                                                        key={promo.id}
                                                                    >
                                                                        {promo.name} ({promo.code})
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name='description'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Mô tả sản phẩm
                                                </FormLabel>
                                                <FormControl>
                                                    <AutosizeTextarea
                                                        {...field}
                                                        placeholder='Nhập mô tả sản phẩm'
                                                        maxHeight={240}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id='right' className='space-y-4 pl-4'>
                            {isLoadingPromotion ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-sm text-gray-500">Đang tải thông tin khuyến mãi...</p>
                                </div>
                            ) : selectedPromotion ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Mã khuyến mãi</label>
                                            <div className="text-sm font-mono bg-gray-100 p-2 rounded flex items-center justify-between">
                                                <p>
                                                    {selectedPromotion.code}
                                                </p>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <CopyIcon
                                                            size={14}
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(selectedPromotion.code)
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
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <p className="text-sm line-clamp-2">{selectedPromotion.name}</p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {selectedPromotion.name}
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Giảm giá</label>
                                            <p className="text-sm font-semibold text-green-600">
                                                {selectedPromotion.discountPercent}%
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                                            <div className="mt-1">
                                                <Badge variant={selectedPromotion.isActive ? 'default' : 'secondary'}>
                                                    {selectedPromotion.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Ngày bắt đầu</label>
                                            <p className="text-sm">{formatDate(selectedPromotion.startDate, 'dd/MM/yyyy')}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Ngày kết thúc</label>
                                            <p className="text-sm">{formatDate(selectedPromotion.endDate, 'dd/MM/yyyy')}</p>
                                        </div>
                                    </div>

                                    {selectedPromotion.description && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Mô tả khuyến mãi</label>
                                            <p className="text-sm mt-1">{selectedPromotion.description}</p>
                                        </div>
                                    )}

                                    <Separator />
                                    <div className='w-full space-y-2 text-sm'>
                                        <div id='rootPrice' className='flex items-center justify-between'>
                                            <p className='font-medium'>Giá gốc:</p>
                                            <p className='font-semibold'>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product.price)}
                                            </p>
                                        </div>
                                        <div id='promotions' className='flex items-center justify-between'>
                                            <p className='font-medium'>Khuyến mãi:</p>
                                            <p className='font-semibold text-green-600'>
                                                -{selectedPromotion.discountPercent}%
                                            </p>
                                        </div>
                                        <div id='totalPrice' className='flex items-center justify-between'>
                                            <p className='font-medium'>Giá sau khuyến mãi:</p>
                                            <p className='font-semibold'>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product.price * (1 - selectedPromotion.discountPercent / 100))}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-sm text-gray-500">Vui lòng chọn mã khuyến mãi để xem chi tiết</p>
                                </div>
                            )}
                        </div>
                    </form>
                <Separator />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Đóng</Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {updateProduct.isPending && <Spinner />}
                        Cập nhật
                    </Button>
                </DialogFooter>
            </Form>
        </>
    )
}
