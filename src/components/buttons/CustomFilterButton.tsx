import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@heroui/react";
import { FilterIcon } from '@/src/components/Icons/extra/TableIcons';
import { ReactNode, useState } from 'react';
import { CustomButton } from '@/src/components/buttons/CustomButton'; // import { CloseIcon } from '@heroui/shared_components-icons';
// import { CloseIcon } from '@heroui/shared_components-icons';

/**
 * @descripcion Popover Personalizado para los filtros
 * @param {header}: Nombre del boton de filtro o ReactNode para menejar su estado
 * @param {children}: Body del filtro a renderizar
  */

type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export default function CustomFilterButton({
  header,
  children,
  confirmFilter,
  cancelFilter,
  styles,
}: {
  confirmFilter?: () => void;
  cancelFilter: () => void;
  header: (isOpen: boolean) => ReactNode;
  children: ReactNode;
  styles?: {
    popoverPosition: PopoverPlacement;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <Popover
      placement={styles?.popoverPosition ?? 'bottom-end'}
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      offset={5}
    >
      <PopoverTrigger>
        <Button
          startContent={<FilterIcon />}
          variant="bordered"
          color={'default'}
        >
          {header(isOpen)}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div
          style={{
            maxWidth: 400,
            minWidth: 300,
          }}
          className="flex w-full flex-col px-1 py-2"
        >
          <div className={'flex justify-end'}>
            {/* <CustomButton
              isIconOnly
              size={'sm'}
              icon={<CloseIcon />}
              color={'default'}
              variant={'bordered'}
              onClick={onClose}
            /> */}
          </div>
          <Spacer />
          {children}
          <Spacer y={2} />
          <div className="flex flex-row justify-end">
            <CustomButton
              size={'md'}
              title={'Limpiar'}
              variant={'bordered'}
              color={'default'}
              onClick={() => {
                cancelFilter();
                onClose();
              }}
            />
            <Spacer />
            {confirmFilter && (
              <CustomButton
                size={'md'}
                onClick={() => {
                  confirmFilter();
                  onClose();
                }}
                title={'Aplicar'}
                variant={'solid'}
                color={'primary'}
              />
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
