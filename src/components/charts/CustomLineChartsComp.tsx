import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface dataModel {
  name: string,
  average: number,
  total:number
}

interface Data {
  chartData: dataModel[]
}


export default function CustomLineChartsComp({ chartData }: Data): React.ReactElement {
  return (
   
      <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" 
             fontSize={12}
             angle={-40} 
             textAnchor="end"
             height={60}
             interval={0}/> 
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#077C76" />
        </LineChart>
      </ResponsiveContainer>
    </div>
      
  );
}

