function getSpecificCrypto() {
    const cryptoSymbols = ['BNB', 'BTC', 'ETH', 'USDT', 'ETC'];

    Promise.all(cryptoSymbols.map(symbol => {
        return fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:${symbol}USDT&token=ckavvb1r01ql5f1n9lg0ckavvb1r01ql5f1n9lgg`)
            .then(response => {
                // Check if the fetch was successful
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Failed to fetch data for ${symbol}`);
            })
            .then(data => {
                // Check if the data contains valid price information
                if (data.c != null && data.pc != null) {
                    const priceChange = data.c - data.pc;
                    const percentChange = (priceChange / data.pc) * 100;

                    return {
                        symbol,
                        price: data.c,
                        priceChange,
                        percentChange,
                    };
                } else {
                    console.warn(`Invalid data for ${symbol}`);
                    return null;
                }
            });
    }))
    .then(cryptoData => {
        const cryptoList = document.getElementById("cryptoList");
        cryptoList.innerHTML = "";

        cryptoData.forEach(crypto => {
            if (crypto !== null) { // Check if the data is valid
                const li = document.createElement("li");
                const listItemContainer = document.createElement("div");
                listItemContainer.className = "listItemContainer";
                li.innerHTML = `
                    <span>${crypto.symbol}</span>
                    <span>$${crypto.price.toFixed(2)}</span>
                    <span>${crypto.priceChange.toFixed(2)} USD (${crypto.percentChange.toFixed(2)}%) today</span>
                `;

                listItemContainer.appendChild(li);
                cryptoList.appendChild(listItemContainer);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching specific cryptos:", error);
        alert("Error fetching specific cryptos. Please try again later.");
    });
}

window.addEventListener("load", getSpecificCrypto);
