import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BlockchainDataProvider } from "./context/BlockainDataContext";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <BlockchainDataProvider>
          <Header />
          {children}
        </BlockchainDataProvider>
      </body>
    </html>
  );
}
