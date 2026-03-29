import type { Metadata } from 'next';
import { Outfit, Orbitron } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'FUTULAW - 2ª Edição | Inovação e Gestão',
  description: 'Seminário de Gestão e de Inovação para Escritórios de Advocacia - OAB Maringá',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${orbitron.variable} font-sans scroll-smooth`}>
      <body className="antialiased bg-[#05010a] text-zinc-100 min-h-[100dvh] flex flex-col">
        {children}
      </body>
    </html>
  );
}