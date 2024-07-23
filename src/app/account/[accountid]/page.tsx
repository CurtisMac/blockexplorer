"use client";

import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BigNumber, Utils } from "alchemy-sdk";

export default function Page({ params }: { params: { accountid: string } }) {
  const [accountBalance, setAccountBalance] = useState<String>();
  const [accountNotFound, setAccountNotFound] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      let account: {
        balance: BigNumber;
      } | null = null;

      try {
        const response = await fetch(
          `/api/account?accountid=${params.accountid}`
        );
        const data = await response.json();
        account = { balance: data.balance };
      } catch (error) {
        console.log(error);
      }

      if (!account) {
        setAccountNotFound(true);
      }

      const balanceInEth = account?.balance
        ? Utils.formatEther(account.balance)
        : "--";

      setAccountBalance(balanceInEth);
    })();
  }, []);

  return (
    <div className="flex flex-col m-4 p-4 border-lime-600 border-2 rounded-lg min-h-96">
      {!accountBalance && !accountNotFound && (
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
      {!accountBalance && accountNotFound && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-lime-600 mr-2" />
          <p className="mt-2">Could not find account {params.accountid}</p>
        </div>
      )}
      {accountBalance && !accountNotFound && (
        <div className="flex-1 break-all">
          <p className="mt-1">account address: {params.accountid}</p>
          <p className="mt-1">account balance: {accountBalance} eth</p>
        </div>
      )}
    </div>
  );
}
