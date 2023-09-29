function getSpecificStocks() {
    const stockSymbols = ['AAPL', 'MSFT', 'IBM', 'GOOGL', 'TSLA'];

    Promise.all(stockSymbols.map(symbol => {
        return fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ckavvb1r01ql5f1n9lg0ckavvb1r01ql5f1n9lgg`)
            .then(response => response.json())
            .then(data => {
                const priceChange = data.c - data.pc;  // Calculate price change
                const percentChange = (priceChange / data.pc) * 100;  // Calculate percentage change
                
                return {
                    symbol: symbol,
                    price: data.c,
                    priceChange: priceChange,
                    percentChange: percentChange
                };
            });
    }))
    .then(stockData => {
        const stockList = document.getElementById("stockList");
        stockList.innerHTML = "";  // Clear the list to avoid duplicates

        stockData.forEach(stock => {
            const li = document.createElement("li");
            const listItemContainer = document.createElement("div");
            listItemContainer.className = "listItemContainer";  // Set a class for styling

            // Include the price change and percentage change in the list item
            li.innerHTML = `
                <span>${stock.symbol}</span>
                <span>$${stock.price.toFixed(2)}</span>
                <span>${stock.priceChange.toFixed(2)} USD (${stock.percentChange.toFixed(2)}%) today</span>
            `;

            listItemContainer.appendChild(li);
            stockList.appendChild(listItemContainer);
        });
    })
    .catch(error => {
        console.error("Error fetching specific stocks:", error);
        alert("Error fetching specific stocks. Please try again later.");
    });
}

window.addEventListener("load", getSpecificStocks);
