import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import { NextAuthProvider } from './providers';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Foster Finder',
  description:
    'An innovative app connecting shelters and fosterers, facilitating the seamless listing and notification of critical care foster kittens in need.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
