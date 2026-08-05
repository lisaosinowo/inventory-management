const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
        required: [true, "Book name is required"], 
    minlength: [3, "Book name must be at least 3 characters long"],
    maxlength: [100, "Book name must be at most 100 characters long"],
  },
  countInStock: {
    type: Number,
      required: [true, "Count in stock is required"],
    min: [1, "Count in stock must be at least 1"],
    max: [255, "Count in stock must be at most 255"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
      max: [10000, "Price must be at most 10000"],
    }, 
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: "",
        validate: {
            validator: v => !v ? true : /^https?:\/\/.+/.test(v), // this tests if the string starts with http:// or https:// and has at least one character after that
            message: "Please enter a valid image URL"
        }, 
    }
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