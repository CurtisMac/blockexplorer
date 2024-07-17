import * as blockchainClient from "@/app/lib/blockchainClient";

export async function GET() {
  try {
    const [blocks, gasPrice, transactions] = await Promise.all([
      blockchainClient.getLatestBlocks(),
      blockchainClient.getCurrentGasPrice(),
      blockchainClient.getLatestTransactions(),
    ]);

    return Response.json({
      blocks,
      gasPrice,
      transactions,
    });
  } catch (error) {
    console.error("Eailed to fetch blockchain data", error);
    return Response.error();
  }
}
