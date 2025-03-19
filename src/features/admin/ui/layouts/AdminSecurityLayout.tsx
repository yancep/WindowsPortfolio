'use client';
import { Tab, Tabs } from "@heroui/react";
// export type TraceProps = {
import SecurityTable from '../components/tables/SecurityTable';

// export type TraceProps = {
//   crudEvents?: NewData<CrudEventModel> | null;
//   loginEvents?: NewData<LoginEventModel> | null;
//   requestEvents?: NewData<RequestEventModel> | null;
// };

export default function AdminSecurityLayout() {
  const tabs = [
    {
      id: 'crud',
      label: 'Usuarios en lista negra',
      content: SecurityTable(),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs size="md" aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab
            key={item.label}
            title={
              <div className="flex items-center space-x-2">
                <span>{item.label}</span>
              </div>
            }
          >
            {typeof item.content === 'function' ? item.content : item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
