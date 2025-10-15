'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types/models/categories/category.model";

interface SelectCategoriesProps {
    data: Category[];
    value?: string;
    onValueChange?: (value: string) => void;
}

export function CategoriesSelect({
    data,
    value,
    onValueChange
} : SelectCategoriesProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}