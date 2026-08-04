const mongoose = require("mongoose");

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

module.exports = mongoose.model("Book", bookSchema);