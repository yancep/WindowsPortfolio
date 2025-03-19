import { Avatar, Divider, Spacer, User } from "@heroui/react";

export interface Step {
  id: number;
  label: string;
  description?: string;
  divider?: boolean;
}

export function StepsComponent({
  steps,
  currentStep,
  gotToStep,
}: {
  steps: Step[];
  currentStep: number;
  gotToStep?: (n: number) => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-center overflow-x-auto">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center justify-center text-center"
        >
          <div className="flex flex-col items-center justify-center text-tiny">
            <Avatar
              color={currentStep === step.id ? 'primary' : 'default'}
              name={`${step.id + 1}`}
              onClick={gotToStep ? () => gotToStep(index) : () => {}}
            />
            <Spacer />
            <h1>{step.label}</h1>
          </div>
          {step.divider && (
            <Divider
              style={{
                marginBottom: 15,
                marginRight: 15,
                marginLeft: step.id === 1 ? 15 : 0,
                width: 90,
                background: currentStep > step.id ? 'bg-primary' : undefined,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function StepsVerticalComponent({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <section className="h-full w-full overflow-y-auto p-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-start ">
          <User
            name={<span className={'text-md'}>{step.label}</span>}
            description={
              <span className={'text-tiny'}>{step.description}</span>
            }
            avatarProps={{
              color: currentStep == index ? 'primary' : 'default',
              showFallback: true,
              fallback: index + 1,
            }}
          />
          {step.divider && (
            <Divider
              orientation="vertical"
              className={`ml-5 h-[20px] w-[1px] ${currentStep > step.id ? 'bg-primary' : ''}`}
            />
          )}
        </div>
      ))}
    </section>
  );
}
