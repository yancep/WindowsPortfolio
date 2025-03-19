/* eslint-disable @next/next/no-sync-scripts */
import { ReactNode } from 'react';
import '@/src/global.css';

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
        {children}
      </body>
    </html>
  );
}

