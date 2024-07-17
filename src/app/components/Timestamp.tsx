export function Timestamp({ unixTimestamp }: { unixTimestamp: number }) {
  const date = new Date(unixTimestamp * 1000);

  return (
    <p>
      {date.getHours().toString().padStart(2, "0")}:
      {date.getMinutes().toString().padStart(2, "0")}:
      {date.getSeconds().toString().padStart(2, "0")}
    </p>
  );
}
