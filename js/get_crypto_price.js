// Function to fetch and display the actual cryptocurrency price using the Finnhub API
function getCryptoPrice() {
    let symbol = document.getElementById("cryptoSymbolInput").value;
    const resultDiv = document.getElementById("cryptoPriceResult");

    if (symbol) {
        // Convert the symbol to uppercase to ensure it matches the API expectations
        symbol = symbol.toUpperCase();

        fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:${symbol}USDT&token=ckavvb1r01ql5f1n9lg0ckavvb1r01ql5f1n9lgg`)
            .then(response => response.json())
            .then(data => {
                const cryptoPrice = data.c;

                if (cryptoPrice !== undefined && cryptoPrice !== null) {
                    const priceChange = data.c - data.pc;
                    const percentageChange = ((priceChange / data.pc) * 100).toFixed(2);

                    const formattedResult = `USD ${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)} (${percentageChange}%) today`;
                    resultDiv.innerHTML = `The current price of ${symbol} is $${cryptoPrice.toFixed(2)} - ${formattedResult}`;
                } else {
                    resultDiv.innerHTML = "Unable to fetch crypto price. Please check the symbol and try again.";
                }
            })
            .catch(error => {
                console.error("Error fetching crypto price:", error);
                resultDiv.innerHTML = "Error fetching crypto price. Please check the symbol and try again.";
            });
    } else {
        resultDiv.innerHTML = "Please enter a crypto symbol.";
    }
}

// Attach an event listener to the "Get Crypto Price" button
document.getElementById("getCryptoPrice").addEventListener("click", getCryptoPrice);

// Allow users to press Enter key to search for the crypto
document.getElementById("cryptoSymbolInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getCryptoPrice();
    }
});
