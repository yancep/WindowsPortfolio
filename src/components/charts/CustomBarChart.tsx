'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { SUCCESS_COLOR } from '@/src/core/theme/app_colors';
import { provincesList } from '@/src/core/constants/provinces';

const data = [
  {
	program : 8,
	project : 55,
	persons : 600,
  },
  {
	program : 5,
	project : 70,
	persons : 500,
  },
  {
	program : 15,
	project : 65,
	persons : 500,
  },
  {
	program : 11,
	project : 35,
	persons : 550,
  },
  {
	program : 4,
	project : 60,
	persons : 400,
  },
  {
	program : 13,
	project : 85,
	persons : 400,
  },
  {
	program : 12,
	project : 75,
	persons : 350,
  },
  {
	program : 3,
	project : 45,
	persons : 350,
  },
  {
	program : 6,
	project : 80,
	persons : 300,
  },
  {
	program : 14,
	project : 95,
	persons : 300,
  },
  {
	program : 10,
	project : 20,
	persons : 450,
  },
  {
	program : 7,
	project : 90,
	persons : 250,
  },
  {
	program : 2,
	project : 30,
	persons : 200,
  },
  {
	program : 1,
	project : 25,
	persons : 150,
  },
  {
	program : 9,
	project : 40,
	persons : 100,
  },
];

const chartSetting = {
  xAxis : [],
  width : 500,
  height : 400,
};

const valueFormatter = ( value : number | null ) => `${ value }mm`;
export default function CustomBarChart( {
										  chartLabel,
										  color,
										} : {
  chartLabel : string;
  color? : string;
} ) {
  const stats = data.map( ( e, index ) => {
	return {
	  ...e,
	  province : provincesList[ index ],
	};
  } );
  
  return (
	<BarChart
	  margin={ {
		left : 120,
	  } }
	  dataset={ stats }
	  yAxis={ [{ scaleType : 'band', dataKey : 'province' }] }
	  series={ [
		{
		  dataKey : 'program',
		  color : color ?? SUCCESS_COLOR,
		  label : chartLabel,
		  valueFormatter,
		},
	  ] }
	  barLabel="value"
	  layout="horizontal"
	/>
  );
}
//   <BarChart data={stats} layout={'horizontal'} width={300}>
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="name" />
//     <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//     <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//     <Tooltip />
//     <Legend />
//     <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
//     <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
//   </BarChart>
