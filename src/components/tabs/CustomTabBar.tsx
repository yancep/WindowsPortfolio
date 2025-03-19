'use client';

import React from 'react';

import { Spacer, Tab, Tabs } from "@heroui/react";
import { Divider } from '@mui/material';

export type TabProps = {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
};

export function CustomTabBar({ tabs }: { tabs: TabProps[] }) {
  return (
    <div className="flex w-full flex-col p-4">
      <Tabs size="md" aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab
            key={item.label}
            title={
              <div className="flex items-center space-x-2">
                {item.icon && (
                  <>
                    {item.icon}
                    <Spacer x={2} />
                  </>
                )}
                <span>{item.label}</span>
              </div>
            }
          >
            <ProgramTabBody item={item.content} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export function ConvocationTabBar({ tabs }: { tabs: TabProps[] }) {
  return (
    <div className="flex w-full flex-col px-4">
      <Tabs size="md" aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab
            key={item.label}
            title={
              <div className="flex items-center space-x-2">
                {item.icon}
                <Spacer x={2} />
                <span>{item.label}</span>
              </div>
            }
          >
            <Divider
          sx={{
            width: '100%',
          }}
        />
            <ProgramTabBody item={item.content} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export function ProjectTabBar({
  tabs,
  header,
}: {
  tabs: TabProps[];
  header: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col">
      <Tabs size="md" aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab
            key={item.label}
            title={
              <div className="flex items-center space-x-2">
                {item.icon}
                <Spacer x={2} />
                <span>{item.label}</span>
              </div>
            }
          >
            <ProgramTabBody item={item.content} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

function ProgramTabBody({ item }: { item: React.ReactNode }) {
  return <div style={{}}>{item}</div>;
}
