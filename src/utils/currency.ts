/**
 * Formats a number as a currency string with commas and 2 decimal places.
 * Example: 1234.56 -> "1,234.56"
 */
export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
