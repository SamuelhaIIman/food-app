import axios from "axios";
import * as cheerio from "cheerio";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const links = require("./links.json");

links.forEach(link => {
  console.log(link.name, link.url);
});

// const categoryUrl = "https://www.s-kaupat.fi"

// async function getAllCategoryUrls() {
//     try {
//         const response = await axios.get(categoryUrl, {
//                     headers: {
//                         "User-Agent": "Mozilla/5.0",
//                     },
//                 });
    
//         const $ = cheerio.load(response.data);

//         const categoryLinks = [];
        
//         $('a[data-test-id="product-navigation-link"]').each((i, el) => {
//         const name = $(el).find(".menu-item--name").text().trim();
//         const href = $(el).attr("href");

//         if (name && href) {
//             categoryLinks.push({
//             name,
//             url: `https://www.s-kaupat.fi${href}`,
//             });
//         }
//         });

//         console.log(categoryLinks);
    
//         // const categoryNamesSaved = [];
    
//         // categoryNamesInMenu.each(() => {
//         //     const categoryName = $(this).find(".menu-item--name").text().trim();
//         //     if (categoryName) {
//         //         categoryNamesSaved.push({ categoryName });
//         //     }
//         // });
    
//         // console.log("Category names:" + categoryNamesSaved);
//     } catch (err) {
//         console.error("Scraping failed:", err);
//     }
// }
// getAllCategoryUrls();