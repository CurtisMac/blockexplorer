"use client";

import { useBlockchainData } from "../hooks/useBlockchainData";

export default function Header() {
  const blockChainData = useBlockchainData();

  return (
    <header className="flex justify-between m-4 p-4 border-lime-600 border-2 rounded-lg">
      <p>Block Explorer</p>
      <p>
        Current Gas Price:{" "}
        {blockChainData.gasPrice ? blockChainData.gasPrice.gasInGwei : "--"}{" "}
        Gwei
      </p>
    </header>
  );
}
