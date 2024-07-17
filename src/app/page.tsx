import LatestBlocks from "./ui/LatestBlocks";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div>This is a search bar</div>
      <div>This shows some useful info about the blockchain</div>
      <div className="flex flex-col lg:flex-row w-full">
        <LatestBlocks className="lg:w-1/2" />
        <div>Show latest transactions</div>
      </div>
    </main>
  );
}
