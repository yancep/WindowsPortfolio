import { Tooltip as RechartsTooltip, TooltipProps } from "recharts"
import { ChartConfig } from "../chart"

interface ChartTooltipProps extends Omit<TooltipProps<any, any>, 'content'> {
  chartConfig: ChartConfig;
}

export const ChartTooltips: React.FC<ChartTooltipProps> = ({ cursor, chartConfig, ...props }) => {
  return (
    <RechartsTooltip
      {...props}
      cursor={cursor}
      content={({ active, payload }) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload;
          return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow">
              {Object.entries(data).map(([key, value]) => {
                if (chartConfig[key]) {
                  return (
                    <div key={key} className="flex flex-row items-center justify-between w-full mb-1">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: chartConfig[key].color }}
                        ></div>
                        <span>{chartConfig[key].label}:</span>
                      </div>
                      <span className="ml-2 font-semibold">{value as number}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        }
        return null;
      }}
    />
  )
}