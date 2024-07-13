import { useContext } from "react";
import { BlockchainDataContext } from "../context/BlockainDataContext";
import { BlockchainDataState } from "../context/blockchainDataReducer";

export const useBlockchainData = (): BlockchainDataState => {
  const context = useContext(BlockchainDataContext);
  if (!context) {
    throw new Error(
      "useBlockchainData must be used within a BlockchainDataProvider"
    );
  }

  return context;
};
