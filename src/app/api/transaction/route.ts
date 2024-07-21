import * as blockchainClient from "@/app/lib/blockchainClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txhash = searchParams.get("txhash");

  if (!txhash) {
    return Response.error();
  }

  const transaction = await blockchainClient.getTransaction(txhash);

  return Response.json({ transaction });
}
