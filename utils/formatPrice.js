// utils/formatPrice.js
const formatPrice = (nprAmount, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig }) => {
    let convertedAmount = nprAmount;

    switch (currency) {
        case "USD":
            convertedAmount = nprAmount * USD_RATE;
            break;
        case "EUR":
            convertedAmount = nprAmount * EURO_RATE;
            break;
        case "AUD":
            convertedAmount = nprAmount * AUS_RATE;
            break;
        default:
            convertedAmount = nprAmount;
    }

    const { symbol } = currencyConfig[currency];
    return `${symbol} ${convertedAmount.toFixed(2)}`;
};

export default formatPrice;