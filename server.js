import express from "express";
import path from "path";
import con from "./db.js"
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    const sql = "SELECT * FROM products";

    con.query(sql, (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).send("DB Error");
        }
        res.render('home', { products: results });
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
