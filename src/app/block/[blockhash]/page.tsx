"use client";

import { useEffect, useState } from "react";
import { useBlockchainData } from "@/app/hooks/useBlockchainData";
import { ThreeDots } from "react-loader-spinner";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Block as BlockType, Utils } from "alchemy-sdk";
import Link from "next/link";

export default function Page({ params }: { params: { blockhash: string } }) {
  const blockChainData = useBlockchainData();
  const [block, setBlock] = useState<BlockType>();
  const [blockNotFound, setBlockNotFound] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      let block = blockChainData.latestBlocks.find(
        (curBlock) => curBlock.hash === params.blockhash
      );

      if (!block) {
        try {
          const response = await fetch(
            `/api/block?blockhash=${params.blockhash}`
          );
          const data = await response.json();
          block = data.block;
        } catch (error) {
          console.log(error);
        }
      }

      if (!block) {
        setBlockNotFound(true);
      }

      setBlock(block);
    })();
  }, []);

  return (
    <div className="flex flex-col m-4 p-4 border-lime-600 border-2 rounded-lg min-h-96">
      {!block && !blockNotFound && (
        <div className="flex-1 flex items-center justify-center">
          <ThreeDots
            height="80"
            color="#65A30D"
            width="80"
            radius="9"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      )}
      {!block && blockNotFound && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-lime-600 mr-2" />
          <p className="mt-2">Could not find block {params.blockhash}</p>
        </div>
      )}
      {block && !blockNotFound && (
        <div className="flex-1 break-all">
          <p className="mt-1">block number: {block.number}</p>
          <p className="mt-1">block hash: {block.hash}</p>
          <p className="mt-1">
            mined at: {new Date(block.timestamp * 1000).toString()}
          </p>
          <p className="mt-1">parent hash: {block.parentHash}</p>
          <p className="mt-1">nonce: {block.nonce}</p>
          <p className="mt-1">
            gas limit: {Utils.formatUnits(block.gasLimit, "gwei")} gwei /{" "}
            {Utils.formatUnits(block.gasLimit, "wei")} wei
          </p>
          <p className="mt-1">
            gas used: {Utils.formatUnits(block.gasUsed, "gwei")} gwei /{" "}
            {Utils.formatUnits(block.gasUsed, "wei")} wei
          </p>
          <p className="mt-1">miner: {block.miner}</p>
          <p className="mt-1">
            number of transactions: {block.transactions.length}
          </p>
          <p className="mt-1">transactions:</p>
          <ul className="mt-1 pl-4">
            {block.transactions.map((transaction, i) => (
              <li className="mt-1" key={i}>
                -{" "}
                <Link href={`/transaction/${transaction}`}>{transaction}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
