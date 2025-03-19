'use client';
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import React, { ReactNode, useState } from 'react';
import { CustomButton } from '@/src/components/buttons/CustomButton';
import { CloseIcon } from "@heroui/shared-icons";
import {
  Step,
  StepsVerticalComponent,
} from '@/src/components/modals/parts/StepComponent';

export default function CustomVerticalModal({
  form,
  header,
  footer,
  onClose,
  steps,
}: {
  header: ReactNode;
  footer: ReactNode;
  onClose: () => void;
  steps: Step[];
  form: (currentStep: number, setStep: (step: number) => void) => ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        {header}
        <CustomButton isIconOnly icon={<CloseIcon />} onClick={onClose} />
      </CardHeader>
      <CardBody className="flex flex-row">
        <StepsVerticalComponent steps={steps} currentStep={currentStep} />
        {form(currentStep, setCurrentStep)}
      </CardBody>
      <CardFooter className="fle justify-end">{footer}</CardFooter>
    </Card>
  );
}
