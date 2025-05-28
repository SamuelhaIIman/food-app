import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
  con.query("CREATE TABLE products (Itemid int AUTO_INCREMENT primary NOT NULL, ProductCategory varchar(255) NOT NULL, ProductName varchar(255) NOT NULL, ProductPrice varchar(255) NOT NULL);", (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});

export default con;