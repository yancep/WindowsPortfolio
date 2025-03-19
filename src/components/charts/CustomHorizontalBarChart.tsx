"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DataModel {
  name: string,
  total: number
}

interface Data {
  chartData: DataModel[]
}


export function CustomHorizontalBarChart({ chartData }: Data): React.ReactElement {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={14}
          angle={-30} 
          textAnchor="end"
          height={60}
          interval={0}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${value}`}
      
        />
        <Tooltip/>
        <Bar
          dataKey="total"
          fill="#077C76"
          radius={[4, 4, 0, 0]}
          className="primary"
          barSize="45"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
