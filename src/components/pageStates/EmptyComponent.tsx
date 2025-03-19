import { Spacer } from "@heroui/react";
import BasicEmptyIcon from '@/src/components/Icons/states/BasicEmptyIcon';

export function EmptyComponent({ customHeight }: { customHeight?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <BasicEmptyIcon />
      <Spacer y={5} />
      <p className="text-center text-2xl ">Sin registros</p>
    </div>
  );
}
