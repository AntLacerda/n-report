import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | N-Report',
    default: 'N-Report',
  },
  description: 'Reporte crimes e ajude a melhorar a segurança da sua região!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body className={`${montserrat.className} antialiased`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}