export function formatMonthYear(date: Date): string {
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${month} ${date.getFullYear()}`;
}
