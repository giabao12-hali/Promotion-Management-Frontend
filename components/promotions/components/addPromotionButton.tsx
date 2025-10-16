'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusIcon } from '@/components/ui/plus'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AutosizeTextarea } from '@/components/ui/textarea-autosize'
import { Switch } from '@/components/ui/switch'
import { usePromotion } from '@/hooks/promotions/usePromotion'
import { DateRangePicker } from '@/components/ui/date-range-picker'

const promotionForm = z.object({
    name: z.string().min(1, "Vui lòng nhập tên mã khuyến mãi"),
    code: z.string().min(1, "Vui lòng nhập mã khuyến mãi"),
    description: z.string().optional(),
    dateRange: z.object({
        from: z.date(),
        to: z.date().optional(),
    }).refine((data) => {
        if (!data.from) {
            return false;
        }
        if (data.to && data.from && data.to < data.from) {
            return false;
        }
        return true;
    }, {
        message: "Vui lòng chọn ngày hợp lệ và ngày kết thúc phải sau ngày bắt đầu",
        path: ["dateRange"]
    }),
    discountPercentage: z.number().min(0, "Phần trăm giảm giá không được âm").max(100, "Phần trăm giảm giá không được vượt quá 100"),
    isActive: z.boolean().optional(),
})

type PromotionFormData = z.infer<typeof promotionForm>

export default function AddPromotionButton() {
    const today = React.useMemo(() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }, []);

    const form = useForm<PromotionFormData>({
        resolver: zodResolver(promotionForm),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            dateRange: {
                from: today,
                to: undefined,
            },
            discountPercentage: 0,
            isActive: false,
        }
    })

    const createPromotion = usePromotion.useCreatePromotion();

    function onSubmit(values: PromotionFormData) {
        createPromotion.mutate({
            ...values,
            description: values.description || "",
            isActive: values.isActive || false,
            discountPercent: values.discountPercentage,
            startDate: values.dateRange.from.toISOString(),
            endDate: values.dateRange.to ? values.dateRange.to.toISOString() : values.dateRange.from.toISOString()
        }, {
            onSuccess: () => {
                form.reset();
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} className="rounded-xl">
                    <PlusIcon />
                    Thêm mã khuyến mãi
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Thêm mới mã khuyến mãi
                    </DialogTitle>
                    <DialogDescription>
                        Vui lòng điền đầy đủ thông tin để thêm mã khuyến mãi.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Tên mã khuyến mãi<span className='text-red-500'>(*)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Nhập tên mã khuyến mãi'
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='code'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Mã khuyến mãi<span className='text-red-500'>(*)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Nhập mã khuyến mãi'
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Mô tả mã khuyến mãi
                                    </FormLabel>
                                    <FormControl>
                                        <AutosizeTextarea
                                            placeholder="Nhập mô tả mã khuyến mãi"
                                            maxHeight={250}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Thời gian khuyến mãi<span className="text-red-500">(*)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <DateRangePicker
                                            date={field.value}
                                            onDateChange={field.onChange}
                                            minDate={today}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountPercentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Phần trăm giảm giá (%)<span className="text-red-500">(*)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập phần trăm giảm giá"
                                            type="number"
                                            {...field}
                                            required
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
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
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'outline'}>Hủy</Button>
                            </DialogClose>
                            <Button type="submit">Thêm mã khuyến mãi</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
