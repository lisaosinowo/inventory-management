const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();
const connection = process.env.CONNECTION_STRING;
mongoose
  .connect(connection)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json()); // this is a middleware that will dissect the body of the request and make it available in req.body

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
}); // if this is left empty when creating a post request, only the _id will be created in the database
// if we add some fields to the schema, then those fields will also be created in the database when we create a new book

const BookModel = mongoose.model("Book", bookSchema);

app.post("/books", async (req, res) => {
  try {
    const newBook = await BookModel.create(req.body); // req.body is the body that the user will enter in the postman
    res.status(201).json(newBook); // this will return the new book that was created in the database as a response to the user
    // we use .json because we want to return the data in json format
  } catch (err) {
    res.status(400).json({ error: err.message }); // this will return the error message as a response to the user if there is an error
  }
});

app.get("/books", async (req, res) => {
  try {
    const bookList = await BookModel.find(); // this will return all the books in the database
    res.status(200).send(bookList); // this will return the list of books as a response to the user
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params; // this will get the id from the url
    const book = await BookModel.findById(id); // this will return the book with the given id

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).send(book); // this will return the book as a response to the user
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });
    /* findByIdAndUpdate takes in three parameters: 
    1. The id of the book to be updated (id)
    2. The new data to update the book with (req.body)
    3. An options object ({ new: true }) */

    // The { new: true } option tells Mongoose to return the updated document instead of the original document.

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
