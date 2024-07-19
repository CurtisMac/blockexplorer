import LatestBlocks from "./ui/LatestBlocks";
import LatestTransactions from "./ui/LatestTransactions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div>This is a search bar</div>
      <div>This shows some useful info about the blockchain</div>
      <div className="flex flex-col lg:flex-row max-w-full">
        <LatestBlocks className="p-4 lg:pr-2 lg:w-1/2" />
        <LatestTransactions className="p-4 lg:pl-2 lg:w-1/2" />
      </div>
    </main>
  );
}
