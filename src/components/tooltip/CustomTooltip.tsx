import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Tooltip } from "@heroui/react";
import { APP_THEME_COLOR } from '@/src/core/theme/theme';

export function CustomToolTip({
  children,
  info,
  properties,
}: {
  children: ReactNode;
  info: ReactNode;
  properties?: {
    offset?: number;
    color?: APP_THEME_COLOR;
  };
}) {
  return (
    <Tooltip
      placement={'bottom'}
      delay={0}
      offset={properties?.offset ?? 5}
      closeDelay={0}
      content={info}
      color={properties?.color ?? 'default'}
    >
      {children}
    </Tooltip>
  );
}

export function CustomToolTipWithOverFlow({
  info,
  children,
  valueRef,
}: {
  info: string;
  children: ReactNode;
  valueRef: string;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null); // Define el tipo de referencia

  useEffect(() => {
    if (textRef.current) {
      const { scrollWidth, clientWidth } = textRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  }, [info, valueRef]); // Agregar valueRef a las dependencias para detectar cambios

  return (
    <div className="relative">
      <div
        className="flex w-full flex-col overflow-x-hidden overflow-ellipsis whitespace-nowrap"
        ref={textRef} // Pasar la referencia aquí
      >
        {children}
      </div>
      {isOverflowing && (
        <CustomToolTip info={info}>
          <div className="absolute overflow-x-hidden overflow-ellipsis whitespace-nowrap">
            {children}
          </div>
        </CustomToolTip>
      )}
    </div>
  );
}
