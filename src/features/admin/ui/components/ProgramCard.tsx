import React, { ReactNode } from 'react';
import { Card, CardBody, Spacer } from "@heroui/react";
import { formatNumber } from '@/src/core/common/utils/utils';
import {
  AppParticipantsIcon,
  AppProgramIcon,
  AppProjectIcon,
} from '@/src/components/Icons/app/sideBarIcons';
import { AppMoneyIcon } from '@/src/components/Icons/app/AppMoneyIcon';
// import Link from 'next/link';
// import { APP_CLIENT_SPP_PROGRAM_ROUTES } from '@/src/app/routes';
import { Program } from '@/src/features/programs/domain/entities/Program';
import { useRouter } from 'next/navigation';
import { APP_CLIENT_PROGRAM_ROUTES } from '@/src/core/routes/routes';

export default function ProgramCard({ program }: { program: Program }) {
  const router = useRouter();

  function RenderText({ children }: { children: ReactNode }) {
    return <span className={'text-small'}>{children}</span>;
  }

  return (
    <div
      style={{
        width: 320,
        height: 165,
        margin: 4,
      }}
    >
      <Card
        shadow="sm"
        isPressable
        fullWidth
        onClick={() => router.push(APP_CLIENT_PROGRAM_ROUTES.INFO(program.id))}
        className="b-2"
        style={{
          height: 160,
        }}
      >
        <CardBody className="overflow-visible">
          <div className="flex flex-col items-start justify-start">
            <div className="flex flex-row justify-start">
              <div>
                <AppProgramIcon height="75" width="75" />
              </div>
              <Spacer x={3} />
              <div className="flex flex-col items-start justify-start text-medium font-semibold">
                <p>{program.code}</p>
                <Spacer />
                <div className={'h-[67px] overflow-y-auto'}>
                  <p className="mb-2 text-medium  text-primary">
                    {program.name}
                  </p>
                </div>
              </div>
            </div>
            <Spacer y={4} />
            <div className="flex w-full flex-row items-center justify-end">
              <div
                style={{
                  fontWeight: 'lighter',
                }}
                className="flex flex-row items-center "
              >
                {<AppProjectIcon height={'18'} width={'18'} />}
                <Spacer />
                <RenderText>{program.projectQuantity}</RenderText>
              </div>
              <Spacer x={4} />
              <div
                style={{
                  fontWeight: 'lighter',
                }}
                className="flex flex-row items-center "
              >
                <AppParticipantsIcon height={'18'} width={'18'} />
                <Spacer />
                <RenderText>{program.memberQuantity}</RenderText>
              </div>
              <Spacer x={4} />
              <div
                style={{
                  fontWeight: 'lighter',
                }}
                className="flex flex-row items-center "
              >
                <AppMoneyIcon height={'19'} width={'19'} />
                <RenderText>{formatNumber(program.budget)} CUP</RenderText>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
