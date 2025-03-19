import { ReactNode, useState } from 'react';
import { URL_TYPE } from '@/src/features/persons/data/models/URL_TYPE';
import { Accordion, AccordionItem } from "@heroui/react";

export function CustomAccordion<P, C>({
  parent,
  child,
}: {
  parent: {
    objects: P[] | null | undefined;
    title: (item: P, index: number) => ReactNode;
    mapUrl: (item: P) => string;
  };
  child: {
    isLoading: boolean;
    loadingText: string;
    title: (item: C, index: number) => ReactNode;
    objects: C[] | null | undefined;
    getChildren: (url: URL_TYPE) => void;
  };
}) {
  const [selectedKey, setSelectedKey] = useState<number | undefined>();

  return (
    <Accordion
      className={'h-full w-full overflow-y-auto p-2 '}
      showDivider={true}
      variant="splitted"
      hideIndicator
      motionProps={AccordionStyle}
    >
      {(parent.objects ?? []).map((item, index) => (
        <AccordionItem
          key={index.toString()}
          aria-label={`Accordion ${index}`}
          onClick={async () => {
            if (selectedKey !== index) child.getChildren(parent.mapUrl(item));
          }}
          title={parent.title(item, index)}
        >
          {child.isLoading ? (
            <div
              className={'flex h-[2-px] flex-col items-center justify-center'}
            >
              {child.loadingText}
            </div>
          ) : (
            child.objects?.map((item, index) => child.title(item, index))
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const AccordionStyle = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      height: 'auto',
      transition: {
        height: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          duration: 1,
        },
        opacity: {
          easings: 'ease',
          duration: 1,
        },
      },
    },
    exit: {
      y: -5,
      opacity: 0,
      height: 0,
      transition: {
        height: {
          easings: 'ease',
          duration: 0.25,
        },
        opacity: {
          easings: 'ease',
          duration: 0.3,
        },
      },
    },
  },
};
