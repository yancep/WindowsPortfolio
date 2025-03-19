"use client"

import * as React from "react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"

export const description = "A donut chart with text"

interface Priority {
  clasificate: string,
  total: number,
  fill: string
}

interface Activity {
  priorityActivity: Priority[]
}

const chartConfig = {
  total: {
    label: "total",
  },
  chrome: {
    label: "Minima",
    color: "#008060",
  },
  safari: {
    label: "Baja",
    color: "#00BD8E",
  },
  firefox: {
    label: "Media",
    color: "#00BD8E1A",
  },
  edge: {
    label: "Alta",
    color: "#077C76",
  },
} satisfies ChartConfig

export default function CustomCirclePieChart({ priorityActivity }: Activity): React.ReactElement {
  const totaltotal = React.useMemo(() => {
    return priorityActivity.reduce((acc, curr) => acc + curr.total, 0)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={priorityActivity}
            dataKey="total"
            nameKey="clasificate"
            innerRadius={60}
            strokeWidth={1}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totaltotal.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </ResponsiveContainer>

  )
}
