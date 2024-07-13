export interface Block {
  number: number;
}

export interface Transaction {
  hash: string;
}

export interface GasPrice {
  gasInWei: number;
  gasInGwei: number;
}

export interface BlockchainDataState {
  latestBlocks: Block[];
  latestTransactions: Transaction[];
  gasPrice: null | GasPrice;
}

export type BlockchainDataAction = {
  type: "UPDATE";
  payload: {
    blocks?: Block[];
    transactions?: Transaction[];
    gasPrice?: GasPrice;
  };
};

export const initialState: BlockchainDataState = {
  latestBlocks: [],
  latestTransactions: [],
  gasPrice: null,
};

export const blockchainDataReducer = (
  state: BlockchainDataState,
  action: BlockchainDataAction
): BlockchainDataState => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        latestBlocks: action.payload.blocks || state.latestBlocks,
        latestTransactions:
          action.payload.transactions || state.latestTransactions,
        gasPrice: action.payload.gasPrice || state.gasPrice,
      };
    default:
      return state;
  }
};
