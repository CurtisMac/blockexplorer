import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import { BlockchainDataProvider } from "./context/BlockainDataContext";
import Header from "./components/Header";

const kodeMono = Kode_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockexplorer",
  description: "A simple block explorer for ethereum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kodeMono.className}>
        <BlockchainDataProvider>
          <Header />
          {children}
        </BlockchainDataProvider>
      </body>
    </html>
  );
}
