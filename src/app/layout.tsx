import type { Metadata } from 'next'; import './globals.css';
export const metadata:Metadata={title:'Consulta tu lugar de votación',description:'Consulta de puesto y mesa de votación'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
