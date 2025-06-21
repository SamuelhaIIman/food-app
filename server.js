const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const path = require("path")

const url = "https://www.s-kaupat.fi/tuotteet/liha-ja-kasviproteiinit-1/nauta";


async function getPrice() {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const $ = cheerio.load(data);
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

        const products = $('[data-test-id="product-card"]');

        products.each(function () {
            const name = $(this).find('[data-test-id="product-card__productName"]').text().trim();
            const cost = $(this).find('[data-test-id="display-price"]').text().trim();

            if (name && cost) {
                meatPrices.push({ name, cost });
            }
        });

        if (fs.existsSync(filePath)) {
            fs.writeFile(filePath, JSON.stringify(meatPrices, null, 2) + "\n", (err) => {
                if (err) throw err;
                console.log("File found and updated!");
            });
        } else {
            fs.appendFile(filePath, JSON.stringify(meatPrices, null, 2) + "\n", (err) => {
                if (err) throw err;
                console.log("Text added and saved!");
            });
        }

    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

getAllPrices(); // Check if wrong placement in the future!!!

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('home', {});
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
