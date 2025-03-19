"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
} from "./chart"
import { ChartTooltips } from "./utils/ChartTooltip";

interface SexData {
  hombres: number;
  mujeres: number;
}

interface ChartData {
  sexdata: SexData[];
}

const chartConfig: ChartConfig = {
  hombres: {
    label: "Hombres",
    color: "#008060",
  },
  mujeres: {
    label: "Mujeres",
    color: "#077C76",
  },
}

export function CustomRadialChart({ sexdata }: ChartData): React.ReactElement {
  const totalVisitors = sexdata[0]?.hombres + sexdata[0]?.mujeres

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[250px]"
      >
        <RadialBarChart
          data={sexdata}
          endAngle={180}
          innerRadius={80}
          outerRadius={130}
        >
          <Tooltip cursor={false} content={<ChartTooltips cursor={false} chartConfig={chartConfig} />} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalVisitors?.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground"
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="hombres"
            stackId="a"
            cornerRadius={5}
            fill="#008060"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="mujeres"
            fill="#077C76"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
