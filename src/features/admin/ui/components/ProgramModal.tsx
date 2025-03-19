/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomModal from '@/src/components/modals/Types/CustomModal';
import { RegisterProgramForm } from '@/src/features/admin/ui/components/RegisterProgramForm';

export default function ProgramModal() {
  return (
    <CustomModal
      buttonProps={{
        variant: 'solid',
        color: 'primary',
        title: 'Registrar programa',
      }}
      form={(step, setStep, onCloseModal) => (
        <RegisterProgramForm
          setCurrentStep={setStep}
          currentStep={step}
          onCloseModal={onCloseModal}
        />
      )}
    />
  );
}
