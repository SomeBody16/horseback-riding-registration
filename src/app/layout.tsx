import type { Metadata } from "next";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import "./globals.css";
import { theme } from './theme';

export const metadata: Metadata = {
  title: "Horseback Riding Registration",
  description: "Register for horseback riding sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme} defaultColorScheme="dark" withGlobalClasses>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
