import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Meu Inventário', description: 'Inventário de estoque com leitor de código de barras' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#101827' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
