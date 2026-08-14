/** Accept "mystore.com" or "https://mystore.com"; empty stays empty. */
export function normalizeStoreUrl(raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}
