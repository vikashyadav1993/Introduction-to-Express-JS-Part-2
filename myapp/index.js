const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

const dbpath = path.join(__dirname, "goodreads.db");
const db = null;
const connectWithDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.database,
    });
    app.listen(3000, () => {
      console.log("Server is started at 3000 Port");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
connectWithDBAndServer();

app.get("/books", async (request, response) => {
  const getBookQueries = `SELECT * FROM book ORDER BY book_id;`;
  const bookArray = await db.all(getBookQueries);
  response.send(bookArray);
});
