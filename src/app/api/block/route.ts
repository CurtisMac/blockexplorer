export async function GET() {
  return new Response(JSON.stringify({ block: 1 }), { status: 200 });
}
