'use client';

import { pieArcLabelClasses, PieChart } from '@mui/x-charts';
import { lighterColorPalette } from '@/src/core/theme/app_colors';

interface PieChartProps {
  data: Array<{
    id: number;
    value: number;
    label?: string;
  }>;
  properties: {
    paddingLeft: number;
  };
  math: {
    total: number;
  };
}

export default function CustomPieChart(props: PieChartProps) {
  const normalize = (v: number, v2: number) =>
    Number.parseFloat(((v * 100) / v2).toFixed(2));

  const valueFormatter = (item: { value: number }) => `${item.value}%`;

  return (
    <PieChart
      skipAnimation={true}
      className={'h-full w-full '}
      colors={lighterColorPalette}
      margin={{
        left: props.properties.paddingLeft,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 35,
          valueFormatter: valueFormatter,
          data: props.data.map((e) => {
            return {
              ...e,
              value: normalize(e.value, props.math.total),
            };
          }),
          innerRadius: 15,
          outerRadius: 120,
          paddingAngle: 3,
          cornerRadius: 7,
          startAngle: -180,
          endAngle: 225,
        },
      ]}
      slotProps={{
        legend: {
          direction: 'column',
          position: { vertical: 'middle', horizontal: 'left' },
          padding: 0,
        },
      }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
    />
  );
}
