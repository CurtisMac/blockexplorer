import { Dispatch, useContext } from "react";
import { BlockchainDataDispatchContext } from "../context/BlockainDataContext";
import { BlockchainDataAction } from "../context/blockchainDataReducer";

export const useBlockchainDataDispatch = (): Dispatch<BlockchainDataAction> => {
  const context = useContext(BlockchainDataDispatchContext);

  if (!context) {
    throw new Error(
      "useBlockchainDataDispatch must be used within a BlockchainDataProvider"
    );
  }

  return context;
};
