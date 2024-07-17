import * as blockchainClient from "@/app/lib/blockchainClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blockhash = searchParams.get("blockhash");

  if (!blockhash) {
    return Response.error();
  }

  const block = await blockchainClient.getBlock(blockhash);

  return Response.json({ block });
}
