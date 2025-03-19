"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./chart"

export const description = "An interactive bar chart"

const chartData = [
    { date: "Instructor", Cientifica: 222, Docente: 150 },
    { date: "Asistente", Cientifica: 97, Docente: 180 },
    { date: "Auxiliar", Cientifica: 167, Docente: 120 },
    { date: "Titular", Cientifica: 242, Docente: 260 },

]

const chartConfig = {
    views: {
        label: "Total",
    },
    Cientifica: {
        label: "Cientifica",
        color: "#077C76",
    },
    Docente: {
        label: "Docente",
        color: "#077C76",
    },
} satisfies ChartConfig

export function CustomBarChartIteractive() {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("Cientifica")

    const total = React.useMemo(
        () => ({
            Cientifica: chartData.reduce((acc, curr) => acc + curr.Cientifica, 0),
            Docente: chartData.reduce((acc, curr) => acc + curr.Docente, 0),
        }),
        []
    )

    return (
        <Card className="mt-6 mr-4 w-[29rem]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
               <div className="flex flex-row">
               <div className="flex flex-1 flex-col justify-center gap-1 ">
                    <CardTitle>Participantes por categorias</CardTitle>
                </div>
                
                <div className="flex ml-4">
                    {["Cientifica", "Docente"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6  text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 "
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
               
               </div>
            </CardHeader>
          
            <CardContent className="px-2 sm:p-6 mt-6">
                <ResponsiveContainer width="100%" height={265}>
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => `${value}`}
                                fontSize={12}
                                angle={-25}
                                type="category"
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                tickFormatter={(value) => `${value}`}

                            />
                            <ChartTooltip
                            cursor={false}
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={(value) => `${value}`}
                                    />
                                }
                            />
                            <Bar dataKey={activeChart}
                                fill={`var(--color-${activeChart})`}
                                radius={[4, 4, 0, 0]}
                                barSize={45}
                                 >
                                <LabelList
                                dataKey={activeChart}
                                position="top"
                                offset={8}
                                className="#008060"
                                fontSize={12}
                              />
                          </Bar>
                        </BarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
