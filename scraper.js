import axios from "axios";
import cheerio from "cheerio";
import con from "./db.js";

//const url = "https://www.s-kaupat.fi/tuotteet/liha-ja-kasviproteiinit-1/nauta";
async function getAllCategoryUrls() {
    const response = await axios.get("https://www.s-kaupat.fi");
    const $ = cheerio.load(response.data);
    const categoryName = $('class="menu-item--name"')

    const categoryLinks = [];

    $("a.category-link").each((i, el) => {
        const url = $(el).attr("href");
        if (url) {
        categoryLinks.push(`https://www.s-kaupat.fi${url}`);
        }
    });

    return categoryLinks;
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
            ProductCategory VARCHAR(255) NOT NULL,
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