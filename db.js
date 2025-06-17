import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    Itemid INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ProductCategory VARCHAR(255) NOT NULL,
    ProductName VARCHAR(255) NOT NULL,
    ProductPrice VARCHAR(255) NOT NULL
  );`;

const insertTableQuery = `
  INSERT INTO products (
    ProductCategory,
    ProductName,
    ProductPrice) VALUES (
    'Meat', 
    'Jauheliha', 
    'hello'
  );`;

const filePath = "pricesFile.txt";

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
  
  con.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table ready.");

    fs.readFile(filePath, "utf8", (err, data) => {
      if(err) throw err;

      let prices;
      try {
        prices = JSON.parse(data);
      } catch (parseError) {
        console.error("Failed to parse pricesFile.txt:", parseError);
        return;
      }

      console.log(`Loaded ${prices.length} prices`);

      prices.forEach((item) => {
        const insertQuery = `
          INSERT INTO products (ProductCategory, ProductName, ProductPrice)
          VALUES (?, ?, ?)
        `
        const values = ["Liha", item.name, item.cost];

        con.query(insertQuery, values, (err) => {
          if(err) throw err;
          console.log(`Inserted prices: ${item.cost}`);
        })
      });
    })
  });
});

export default con;
