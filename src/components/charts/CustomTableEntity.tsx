import React from 'react';

interface AnalyticsItemProps {
  source: string;
  cant: string;
  width?: number;
  styleWidth?: React.CSSProperties;
}

interface ColumnTitle {
  label: string;
  key: string;
}

interface AnalyticsListProps {
  items: AnalyticsItemProps[];
  columnTitles: ColumnTitle[];
}

const AnalyticsItem: React.FC<AnalyticsItemProps> = ({
  source,
  cant,
  width,
  styleWidth,
}) => {
  const fullStyleWidth = styleWidth || { width: `${width}%` };

  return (
    <li className="relative px-2 py-1">
      <div
        className="absolute inset-0 rounded-lg"
        aria-hidden="true"
        style={fullStyleWidth}
      ></div>
      <div className="relative flex justify-between space-x-2">
        <div>{source}</div>
        <div className="font-medium">{cant}</div>
      </div>
    </li>
  );
};

const CustomTableEntity: React.FC<AnalyticsListProps> = ({
  items,
  columnTitles,
}) => {
  return (
    <div
      className="grow overflow-auto rounded-lg p-3"
      style={{ backgroundColor: '#00BD8E1A', maxHeight: '500px' }}
    >
      {' '}
      {/* Ajusta 'maxHeight' según sea necesario */}
      <div className="flex h-full flex-col">
        {/* Dynamic Columns Headers */}
        <div className="flex justify-between space-x-2 px-2 text-xs font-semibold uppercase text-slate-400">
          {columnTitles.map((title, index) => (
            <span key={index}>{title.label}</span>
          ))}
        </div>

        <ul className="mb-4 mt-3 space-y-1 text-sm text-slate-800">
          {items.map((item, index) => (
            <AnalyticsItem
              key={index}
              source={item.source}
              cant={item.cant}
              width={item.width}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomTableEntity;
