import { unstable_noStore as noStore } from "next/cache";

export async function getCurrentBlock() {
  noStore();
}
