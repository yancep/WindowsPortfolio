import { Spacer, Spinner } from "@heroui/react";
import React from 'react';

export function LoadingComponent({ text }: { text: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Spinner />
      <Spacer y={1} />
      <p>{text}</p>
    </div>
  );
}
