import mysql from 'mysql2';
import dotenv from 'dotenv';

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
  INSET INTO products (
  );`;

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
  con.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});

export default con;