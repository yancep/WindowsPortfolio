'use client';
import { LoginForm } from '@/src/features/authentication/ui/components/LoginForm';
import Background from '@/src/features/authentication/ui/components/Background';
import { Card, CardBody, CardHeader } from "@heroui/react";
import LogoAndText from '@/src/features/authentication/ui/components/LogoAndText';

export default function LoginView() {
  return (
    <div className="m-0 flex h-full w-full items-center justify-center p-0">
      <Background />
      <Card className="absolute" style={{ width: 500, padding: 10 }}>
        <CardHeader className="flex flex-col justify-center">
          <LogoAndText />
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
