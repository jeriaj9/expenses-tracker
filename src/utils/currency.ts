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

/**
 * Parses a comma-separated currency string back to a number.
 * Example: "1,234.56" -> 1234.56
 */
export const parseCurrency = (formattedAmount: string): number => {
    return parseFloat(formattedAmount.replace(/,/g, ''));
};

/**
 * Formats the input value while typing, allowing commas and decimals.
 */
export const formatAmountInput = (value: string): string => {
    // Remove non-numeric characters except dot
    const cleanValue = value.replace(/[^0-9.]/g, '');

    // Split integer and decimal parts
    const parts = cleanValue.split('.');

    // Format integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Rejoin with decimal part (limiting to one dot)
    return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};
