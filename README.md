# Food App

## About

**Food App** is a budgeting tool designed to help people in Finland give ideas and compare prices. 
This is a personal project to improve my own budgeting habits and is now evolving into a user-friendly website to help others save money and make informed shopping decisions.

---

## Tech Stack

### Technology 

**Node.js**
**Express**
**EJS**
**MySQL**
**Axios**
**Cheerio**
**Dotenv**
**JavaScript**

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/SamuelhaIIman/food-app.git
cd food-app
```

### Install dependencies

```bash
npm install axios cheerio dotenv ejs express mysql2
```

### Configure environment variables

Create a ``.env`` file in the root directory and add your database credentials:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

### Run the program

```bash
node .\server.js
```

---

## Features

- **Web scraping:** Automatically fetches product names and prices from the S-Market website.
- **Budget calculation:** Helps users plan and track grocery expenses.
- **Database storage:** Saves historical product prices for analysis and comparison.
- **User-friendly web interface:** Simple UI to view products, prices, and budgets.

---

## Planned Improvements

- Filter products by category and store.
- Track price changes over time.
- Weekly budget reports and spending summaries.
- User accounts for personalized budgets.
- Deploy to production with a secure cloud database.

---

## License

This project is currently personal and in early development. Licensing details will be added once it's closer to a public release.

---

## Acknowledgements

- Node.js
- Express
- Cheerio
- Axios
- MySQL

