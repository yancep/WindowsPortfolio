import { provincesList } from '@/src/core/constants/provinces';
import { LineChart, lineElementClasses, markElementClasses, } from '@mui/x-charts/LineChart';

const persons = Array.from( { length : 15 }, () =>
  Math.floor( Math.random() * ( 500 + 1 ) ),
);

const programs = Array.from( { length : 15 }, () =>
  Math.floor( Math.random() * ( 30 + 1 ) ),
);
const projects = Array.from( { length : 15 }, () =>
  Math.floor( Math.random() * ( 200 + 1 ) ),
);

export default function CustomLineChart() {
  return (
	<LineChart
	  className="m-0 overflow-x-auto"
	  legend={ undefined }
	  series={ [
		{ data : persons, label : 'Personas', id : 'persons' },
		{ data : programs, label : 'Programas', id : 'programs' },
		{ data : projects, label : 'Proyectos', id : 'projects' },
	  ] }
	  sx={ {
		[ `& .${ lineElementClasses.root }` ] : {
		  strokeWidth : 2.5,
		},
		[ `& .${ markElementClasses.root }` ] : {
		  scale : '0.8',
		  fill : '#fff',
		  strokeWidth : 2.5,
		},
		[ `& .${ markElementClasses.root }` ] : {
		  scale : '0.8',
		  fill : '#fff',
		  strokeWidth : 2.5,
		},
	  } }
	  xAxis={ [{ scaleType : 'point', data : provincesList }] }
	/>
  );
}
