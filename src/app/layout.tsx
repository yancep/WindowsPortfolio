/* eslint-disable @next/next/no-sync-scripts */
import { ReactNode } from 'react';
import Providers from '../components/providers/NextUiProvider';
import axios from 'axios';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GAPID</title>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <script type="text/javascript" src="/pdf.js"></script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/healthcheck/?format=json`,
    );
    return response.status >= 200 && response.status < 300; // Check for successful response
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false; // Backend is unavailable
  }
}
