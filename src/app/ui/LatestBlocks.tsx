"use client";

import { Block as BlockType } from "alchemy-sdk";
import { useBlockchainData } from "../hooks/useBlockchainData";
import clsx from "clsx";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Timestamp } from "../components/Timestamp";
import { DetailsList } from "../components/DetailsList";
import Link from "next/link";

function BlockDetails({ block }: { block: BlockType }) {
  return (
    <div className="flex flex-row  justify-between items-center w-full">
      <div>
        <Link href={`/block/${block.hash}`}>{block.number}</Link>
        <Timestamp unixTimestamp={block.timestamp} />
      </div>
      <div className="ml-12 mr-12">
        <p>{block.transactions.length} txns</p>
      </div>
      <div className="overflow-hidden">
        <p>Mined by</p>
        <p className="truncate mr-2">{block.miner}</p>
      </div>
    </div>
  );
}

export default function LatestBlocks({ className }: { className?: string }) {
  const blockChainData = useBlockchainData();

  return (
    <div className={clsx("m-4 border-lime-600 border-2 rounded-lg", className)}>
      <p className="m-2 ml-4">Latest Blocks</p>
      {blockChainData.latestBlocks.length
        ? blockChainData.latestBlocks.map((block) => (
            <DetailsList key={block.hash} icon={Square3Stack3DIcon}>
              <BlockDetails block={block} />
            </DetailsList>
          ))
        : new Array(10)
            .fill({})
            .map((_, i) => <DetailsList key={i} icon={Square3Stack3DIcon} />)}
    </div>
  );
}
