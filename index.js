const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();
const bookRouter = require("./routes/books.routes");
const connection = process.env.CONNECTION_STRING;
mongoose
  .connect(connection)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json()); // this is a middleware that will dissect the body of the request and make it available in req.body
app.use("/books", bookRouter); // this will use the bookRouter for all the routes that start with /books

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});