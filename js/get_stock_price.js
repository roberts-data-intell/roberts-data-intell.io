// Function to fetch and display the actual stock price using the Finnhub API
function getStockPrice() {
    const symbol = document.getElementById("stockSymbolInput").value;
    const resultDiv = document.getElementById("stockPriceResult");

    if (symbol) {
        // Use the Finnhub API to fetch the stock price
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ckavvb1r01ql5f1n9lg0ckavvb1r01ql5f1n9lgg`)
            .then(response => response.json())
            .then(data => {
                const stockPrice = data.c;

                if (stockPrice !== undefined && stockPrice !== null) {
                    // Calculate price change and percentage change
                    const priceChange = data.d;
                    const percentageChange = data.dp;

                    // Format the result
                    const formattedResult = `USD ${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)} (${percentageChange.toFixed(2)}%) today`;
                    resultDiv.innerHTML = `The current price of ${symbol} is $${stockPrice.toFixed(2)} - ${formattedResult}`;
                } else {
                    resultDiv.innerHTML = "Unable to fetch stock price. Please check the symbol and try again.";
                }
            })
            .catch(error => {
                console.error("Error fetching stock price:", error);
                resultDiv.innerHTML = "Error fetching stock price. Please check the symbol and try again.";
            });
    } else {
        resultDiv.innerHTML = "Please enter a stock symbol.";
    }
}

// Attach an event listener to the "Get Stock Price" button
document.getElementById("getStockPrice").addEventListener("click", getStockPrice);

// Allow users to press Enter key to search for the stock
document.getElementById("stockSymbolInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getStockPrice();
    }
});
