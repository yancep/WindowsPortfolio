import React from 'react';
import { Button } from "@heroui/react";

interface FormFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  isLastStep: boolean;
  isLoading: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({
  onBack,
  onNext,
  isLastStep,
  isLoading,
}) => {
  return (
    <div className="flex w-full flex-row justify-between">
      {onBack && (
        <Button
          onClick={onBack}
          variant="light"
          color="secondary"
          disabled={isLoading}
        >
          Atrás
        </Button>
      )}
      {!isLastStep && (
        <Button
          variant="solid"
          type="button"
          color="primary"
          disabled={isLoading}
          onClick={onNext}
        >
          Siguiente
        </Button>
      )}
    </div>
  );
};

export default FormFooter;
