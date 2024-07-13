"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import {
  BlockchainDataAction,
  blockchainDataReducer,
  BlockchainDataState,
  initialState,
} from "./blockchainDataReducer";

interface BlockchainDataProviderProps {
  children: ReactNode;
}

export const BlockchainDataContext = createContext<BlockchainDataState | null>(
  null
);

export const BlockchainDataDispatchContext =
  createContext<Dispatch<BlockchainDataAction> | null>(null);

export const BlockchainDataProvider: React.FC<BlockchainDataProviderProps> = ({
  children,
}) => {
  const [blockchainData, dispatch] = useReducer(
    blockchainDataReducer,
    initialState
  );

  const fetchBlockChainData = useCallback(async () => {
    try {
      const [gasResponse] = await Promise.all([fetch("/api/gas")]);
      const [gasPrice] = await Promise.all([gasResponse.json()]);
      dispatch({ type: "UPDATE", payload: { gasPrice } });
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBlockChainData();
    // TODO: move retetchDelay to config
    const refetchDelay = 60 * 1000 * 5;

    const interval = setInterval(fetchBlockChainData, refetchDelay);

    // cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <BlockchainDataContext.Provider value={blockchainData}>
      <BlockchainDataDispatchContext.Provider value={dispatch}>
        {children}
      </BlockchainDataDispatchContext.Provider>
    </BlockchainDataContext.Provider>
  );
};
