import { Network, Alchemy, Utils } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
  connectionInfoOverrides: {
    skipFetchSetup: true,
  },
};

const alchemyClient = new Alchemy(settings);

type Blockhash = string;

export function getBlock(
  blockHashOrBlockTag: Blockhash | "earliest" | "pending" | "latest"
) {
  return alchemyClient.core.getBlock(blockHashOrBlockTag);
}

export function getLatestBlock() {
  return alchemyClient.core.getBlockNumber();
}

export async function getLatestBlocks(count = 10) {
  const latestBlockNumber = await alchemyClient.core.getBlockNumber();
  const blockPromises = [];

  for (let i = 0; i < count; i++) {
    blockPromises.push(alchemyClient.core.getBlock(latestBlockNumber - i));
  }

  return Promise.all(blockPromises);
}

export async function getCurrentGasPrice() {
  const data = await alchemyClient.core.getGasPrice();
  const gasInWei = Utils.formatUnits(data, "wei");
  const gasInGwei = Utils.formatUnits(data, "gwei");

  return { gasInWei, gasInGwei };
}
