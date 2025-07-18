import axios from "axios";
import * as cheerio from "cheerio";
import con from "./db.js";

const url = "https://www.s-kaupat.fi/tuotteet/liha-ja-kasviproteiinit-1/nauta";
async function getAllCategoryUrls() {
    try {
        const response = await axios.get(categoryUrl, {
                    headers: {
                        "User-Agent": "Mozilla/5.0",
                    },
                });
    
        const $ = cheerio.load(response.data);

        const categoryLinks = [];
        
        $('a[data-test-id="product-navigation-link"]').each((i, el) => {
        const name = $(el).find(".menu-item--name").text().trim();
        const href = $(el).attr("href");

        if (name && href) {
            categoryLinks.push({
            name,
            url: `https://www.s-kaupat.fi${href}`,
            });
        }
        });

        console.log(categoryLinks);
    
        // const categoryNamesSaved = [];
    
        // categoryNamesInMenu.each(() => {
        //     const categoryName = $(this).find(".menu-item--name").text().trim();
        //     if (categoryName) {
        //         categoryNamesSaved.push({ categoryName });
        //     }
        // });
    
        // console.log("Category names:" + categoryNamesSaved);
    } catch (err) {
        console.error("Scraping failed:", err);
    }
}

async function getAllPrices() {
    try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                },
            });
            const $ = cheerio.load(response.data);
    
            const products = $('[data-test-id="product-card"]');
            const meatPrices = [];

            products.each(() => {
            const name = $(this).find('[data-test-id="product-card__productName"]').text().trim();
            const cost = $(this).find('[data-test-id="display-price"]').text().trim();

            if (name && cost) {
                meatPrices.push({ name, cost });
            }
        });

        console.log(`Scraped ${meatPrices.length} products`);

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS products (
            Itemid INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            ProductCategory INT NOT NULL,
            ProductName VARCHAR(255) NOT NULL,
            ProductPrice VARCHAR(255) NOT NULL
            );
        `;

        con.query(createTableQuery, (err) => {
            if (err) throw err;
            console.log("Table ready");

            meatPrices.forEach((item) => {
                const insertQuery = `
                INSERT INTO products (ProductCategory, ProductName, ProductPrice)
                VALUES (?, ?, ?)
                `;
                const values = ["Liha", item.name, item.cost];

                con.query(insertQuery, values, (err) => {
                    if (err) throw err;
                    console.log(`Inserted: ${item.name} | ${item.cost}`);
                });
            });
        });

    } catch (err) {
        console.error("Scraping failed:", err);
    }
}
getAllPrices();