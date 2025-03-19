'use client';
import { Tab, Tabs } from "@heroui/react";
import CrudEventsTab from '@/src/features/admin/ui/components/tables/crudEventsTab';
import LoginEventsTab from '@/src/features/admin/ui/components/tables/loginEventsTab';
import RequestEventsTab from '@/src/features/admin/ui/components/tables/requestEventsTab';
import React from 'react';

export default function TraceViewTab() {
  const tabs = [
    {
      id: 'crud',
      label: 'Eventos de escritura',
      content: CrudEventsTab(),
    },
    {
      id: 'login',
      label: 'Inicios de sesión',
      content: LoginEventsTab(),
    },
    {
      id: 'request',
      label: 'Eventos de lectura',
      content: RequestEventsTab(),
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
