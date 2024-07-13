import * as blockchainClient from "@/app/lib/blockchainClient";

export async function GET(request: Request) {
  try {
    const result = await blockchainClient.getCurrentGasPrice();

    return Response.json(result);
  } catch (error) {
    console.error("Eailed to fetch blockchain data", error);
    return Response.error();
  }
}
