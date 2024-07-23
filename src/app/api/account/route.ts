import * as blockchainClient from "@/app/lib/blockchainClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountid");

  if (!accountId) {
    return Response.error();
  }

  const balance = await blockchainClient.getBalance(accountId);

  return Response.json({ balance });
}
