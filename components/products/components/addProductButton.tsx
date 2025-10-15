'use client'

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/plus";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CategoriesSelect } from "./selectCategories";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AutosizeTextarea } from "@/components/ui/textarea-autosize";
import { useCategories } from "@/hooks/categories/useCategories";
import { useProduct } from "@/hooks/products/useProduct";

const productForm = z.object({
    name: z.string().min(1, "Vui lòng nhập tên sản phẩm"),
    code: z.string().min(1, "Vui lòng nhập mã sản phẩm"),
    description: z.string().optional(),
    price: z.number().min(0, "Giá tiền không được âm"),
    categoryId: z.string().min(1, "Vui lòng chọn danh mục sản phẩm"),
    isActive: z.boolean().optional(),
});

export function AddProductButton() {
    const { data: categoryResponse } = useCategories.useGetAllCategories();
    const categories = categoryResponse || [];

    const form = useForm<z.infer<typeof productForm>>({
        resolver: zodResolver(productForm),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            price: 0,
            categoryId: "",
            isActive: false,
        }
    });

    const createProduct = useProduct.useCreateProduct();

    function onSubmit(values: z.infer<typeof productForm>) {
        console.log("Form values:", values);
        createProduct.mutate({
            ...values,
            description: values.description || "",
            isActive: values.isActive || false
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
                    Thêm sản phẩm
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Thêm mới sản phẩm
                    </DialogTitle>
                    <DialogDescription>
                        Vui lòng điền đầy đủ thông tin để thêm sản phẩm mới.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Tên sản phẩm<span className="text-red-500">(*)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập tên sản phẩm"
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
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Mã sản phẩm<span className="text-red-500">(*)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập mã sản phẩm"
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
                                        Mô tả sản phẩm
                                    </FormLabel>
                                    <FormControl>
                                        <AutosizeTextarea
                                            placeholder="Nhập mô tả sản phẩm"
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
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Giá tiền
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập giá tiền"
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
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Danh mục sản phẩm<span className="text-red-500">(*)</span>
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
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Sản phẩm khả dụng?
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
                                <Button variant={'outline'} type="submit">Hủy</Button>
                            </DialogClose>
                            <Button>Thêm sản phẩm</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}