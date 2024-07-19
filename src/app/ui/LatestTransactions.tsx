"use client";

import { TransactionResponse, Utils } from "alchemy-sdk";
import { useBlockchainData } from "../hooks/useBlockchainData";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { DetailsList } from "../components/DetailsList";
import { Timestamp } from "../components/Timestamp";

function TransactionDetails({
  transaction,
}: {
  transaction: TransactionResponse;
}) {
  console.log(transaction);
  return (
    <div className="flex flex-row justify-around w-full">
      <div className="w-1/3 overflow-hidden pr-10">
        <p className="truncate mr-2">{transaction.hash}</p>
        {transaction.timestamp && (
          <Timestamp unixTimestamp={transaction.timestamp} />
        )}
      </div>
      <div className="w-1/3 ml-2 md:ml-4 lg:ml-10">
        <p>amount:</p>
        <div className="flex flex-row overflow-hidden">
          <p className="truncate">{Utils.formatEther(transaction.value)}</p>
          <p className="ml-2">eth</p>
        </div>
      </div>
      <div className="w-1/3 pl-10 overflow-hidden">
        <p className="truncate mr-2">from: {transaction.from}</p>
        <p className="truncate mr-2">to: {transaction.to}</p>
      </div>
    </div>
  );
}

export default function LatestTransactions({
  className,
}: {
  className?: string;
}) {
  const blockChainData = useBlockchainData();

  return (
    <div className={className}>
      <div className="border-lime-600 border-2 rounded-lg">
        <p className="m-2 ml-4">Latest Transactions</p>
        {blockChainData.latestTransactions.length
          ? blockChainData.latestTransactions
              .slice(0, 10)
              .map((transaction) => (
                <DetailsList key={transaction.hash} icon={DocumentIcon}>
                  <TransactionDetails transaction={transaction} />
                </DetailsList>
              ))
          : new Array(10)
              .fill({})
              .map((_, i) => <DetailsList key={i} icon={DocumentIcon} />)}
      </div>
    </div>
  );
}
