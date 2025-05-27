const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.s-kaupat.fi/tuotteet/liha-ja-kasviproteiinit-1";


async function getPrice() {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const $ = cheerio.load(data);
        
        const price = $("h1").text()
        console.log(price);
    } catch (error) {
        console.error(error)
    }
}
getPrice();

const filePath = "pricesFile.txt";
const meatPrices = [];
async function getAllPrices() {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });
        const $ = cheerio.load(response.data);

        const prices = $('[data-test-id="display-price"]');

        prices.each(function () {
            const cost = $(this).text().trim();
            if (cost.includes("€")) {
                meatPrices.push({ cost });
            }
        });

        if (fs.existsSync(filePath)) {
            fs.writeFile(filePath, JSON.stringify(meatPrices) + "\n", (err) => {
                if (err) throw err;
                console.log("File found!");
            });
        } else {
            fs.appendFile(filePath, JSON.stringify(meatPrices) + "\n", (err) => {
                if (err) throw err;
                console.log("Saved!");
            });
        }
        //console.log(meatPrices);

    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

getAllPrices();