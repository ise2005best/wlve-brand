const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  GBP: "£",
  USD: "$",
  EUR: "€",
};

/**
 * Formats a price with its currency symbol and thousand separators,
 * e.g. formatPrice(82000, "NGN") -> "₦82,000".
 * Currencies without a known symbol fall back to the ISO code ("CAD 120").
 */
export const formatPrice = (amount: number | string, currencyCode: string) => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;

  if (!Number.isFinite(value)) return `${currencyCode} 0`;

  // Only show decimals when the amount actually has them.
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const symbol = CURRENCY_SYMBOLS[currencyCode?.toUpperCase()];
  return symbol ? `${symbol}${formatted}` : `${currencyCode} ${formatted}`;
};

export default formatPrice;
