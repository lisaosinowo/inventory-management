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

bookSchema.virtual("id").get(function () {
    return this._id.toHexString();
}); // virtual is a property that is not stored in the database, but is calculated when we access it
// virtual is good for aliasing exising fields, or for creating new fields that are derived from existing fields
// toHexString() is a method that converts the ObjectId to a string

bookSchema.set("toJSON", {
    virtuals: true,
}); // this will make sure that the virtuals are included when we convert the document to JSON
// by default, when you convert mongoose documents to JSON the virtual properties are not included

module.exports = mongoose.model("Book", bookSchema);