"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
    { month: "T.1", desktop: 186, mobile: 80 },
    { month: "T.2", desktop: 305, mobile: 200 },
    { month: "T.3", desktop: 237, mobile: 120 },
    { month: "T.4", desktop: 73, mobile: 190 },
    { month: "T.5", desktop: 209, mobile: 130 },
    { month: "T.6", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Giá gốc",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Giá khuyến mãi",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartBarMultiple() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tổng doanh thu</CardTitle>
                <CardDescription>Tháng 1 - Tháng 6 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Tăng trưởng 5.2% trong tháng này <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Hiển thị tổng số lượt áp dụng trong 6 tháng qua
                </div>
            </CardFooter>
        </Card>
    )
}
