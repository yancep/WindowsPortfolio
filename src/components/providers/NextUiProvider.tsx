'use client';
import { MATERIAL_THEME } from '@/src/core/theme/theme';
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import '@/src/global.css';
import { ErrorToast } from '@/src/components/toast/ErrorToast';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={MATERIAL_THEME}>
      <HeroUIProvider locale="es-ES">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="h-screen w-screen bg-background text-foreground light">
          {children}
        </div>
      </HeroUIProvider>
    </ThemeProvider>
  );
}

function VerifyConnection({ isConnected }: { isConnected: boolean }) {
  // Check if already on the global error page
  if (!isConnected) {
    ErrorToast('Se ha perdido la conexión con el servidor');
  }

  return null;
}
