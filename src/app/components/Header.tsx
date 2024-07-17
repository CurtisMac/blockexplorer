"use client";

import Link from "next/link";
import { useBlockchainData } from "../hooks/useBlockchainData";

export default function Header() {
  const blockChainData = useBlockchainData();

  return (
    <header className="flex justify-between m-4 p-4 border-lime-600 border-2 rounded-lg">
      <Link href="/">Block Explorer</Link>
      <p>
        Current Gas Price:{" "}
        {blockChainData.gasPrice ? blockChainData.gasPrice.gasInGwei : "--"}{" "}
        Gwei
      </p>
    </header>
  );
}
