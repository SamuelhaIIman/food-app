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

const meatPrices = [];
async function getAllPrices() {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0", // Spoof user-agent
            },
        });
        const $ = cheerio.load(response.data);

        // Use data-test-id for a stable selector
        const prices = $('[data-test-id="display-price"]');

        prices.each(function () {
            const cost = $(this).text().trim();
            if (cost.includes("€")) {
                meatPrices.push({ cost });
            }
        });

        console.log(meatPrices);
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

getAllPrices();