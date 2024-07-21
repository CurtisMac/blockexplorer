"use client";

import { useEffect, useState } from "react";
import { useBlockchainData } from "@/app/hooks/useBlockchainData";
import { ThreeDots } from "react-loader-spinner";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { TransactionResponse, Utils } from "alchemy-sdk";
import Link from "next/link";

export default function Page({ params }: { params: { txhash: string } }) {
  const blockChainData = useBlockchainData();
  const [transaction, setTransaction] = useState<TransactionResponse>();
  const [transactionNotFound, setTransactionNotFound] =
    useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      let transaction: TransactionResponse | undefined =
        blockChainData.latestTransactions.find(
          (curTx) => curTx.hash === params.txhash
        );

      if (!transaction) {
        try {
          const transactionResponse = await fetch(
            `/api/transaction?txhash=${params.txhash}`
          );
          const transactionData = await transactionResponse.json();
          transaction = transactionData.transaction;

          if (transaction && !transaction.timestamp && transaction?.blockHash) {
            const blockResponse = await fetch(
              `/api/block?blockhash=${transaction?.blockHash}`
            );
            const blockData = await blockResponse.json();
            transaction.timestamp = blockData.block?.timestamp;
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (!transaction) {
        setTransactionNotFound(true);
      }

      setTransaction(transaction);
    })();
  }, []);

  return (
    <div className="flex flex-col m-4 p-4 border-lime-600 border-2 rounded-lg min-h-96">
      {!transaction && !transactionNotFound && (
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
      {!transaction && transactionNotFound && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-lime-600 mr-2" />
          <p className="mt-2">Could not find transaction {params.txhash}</p>
        </div>
      )}
      {transaction && !transactionNotFound && (
        <div className="flex-1 break-all">
          <p className="mt-1">transaction hash: {transaction.hash}</p>
          <p className="mt-1">
            timestamp:{" "}
            {transaction.timestamp && Number(transaction.timestamp)
              ? new Date(transaction.timestamp * 1000).toString()
              : "--"}
          </p>
          <p className="mt-1">
            amount: {Utils.formatEther(transaction.value)} eth
          </p>
          <p className="mt-1">
            gas price:{" "}
            {transaction.gasPrice
              ? Utils.formatUnits(transaction.gasPrice, "gwei")
              : "--"}{" "}
            gwei /{" "}
            {transaction.gasPrice
              ? Utils.formatUnits(transaction.gasPrice, "wei")
              : "--"}{" "}
            wei
          </p>
          <p className="mt-1">
            gas limit: {Utils.formatUnits(transaction.gasLimit, "gwei")} gwei /{" "}
            {Utils.formatUnits(transaction.gasLimit, "wei")} wei
          </p>
          <p className="mt-1">from: {transaction.from}</p>
          <p className="mt-1">to: {transaction.to}</p>
          <p className="mt-1">confirmations: {transaction.confirmations}</p>
          <p className="mt-1">nonce: {transaction.nonce}</p>
          <Link href={`/block/${transaction.blockHash}`}>
            <p className="mt-1">block hash: {transaction.blockHash}</p>
          </Link>
          <Link href={`/block/${transaction.blockHash}`}>
            <p className="mt-1">block number: {transaction.blockNumber}</p>
          </Link>
        </div>
      )}
    </div>
  );
}
