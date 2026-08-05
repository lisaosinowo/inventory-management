const { body, validationResult, param } = require("express-validator");

const createBookValidation = [
  body("bookName")
    .notEmpty()
    .withMessage("Book name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Book name must be between 3 and 100 characters long"),
  body("countInStock")
    .notEmpty()
    .withMessage("Count in stock is required")
    .isNumeric({ no_leading_zeros: true })
    .withMessage("Count in stock must be a number")
    .isInt({ min: 1, max: 255 })
    .withMessage("Count in stock must be an integer between 1 and 255"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1, max: 10000 })
    .withMessage("Price must be a number between 1 and 10000"),
  body("image")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image URL must be a valid URL"),
];

const updateBookValidation = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("bookName")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Book name must be between 3 and 100 characters long"),
  body("countInStock")
    .optional()
    .isNumeric({ no_leading_zeros: true })
    .withMessage("Count in stock must be a number")
    .isInt({ min: 1, max: 255 })
    .withMessage("Count in stock must be an integer between 1 and 255"),
  body("price")
    .optional()
    .isFloat({ min: 1, max: 10000 })
    .withMessage("Price must be a number between 1 and 10000"),
  body("image").optional().isURL().withMessage("Image URL must be a valid URL"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); // this will get the validation results from the request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // this will return the validation errors as a response to the user
  }
  next(); // this will call the next middleware in the stack, which is the controller function that will handle the request
};

module.exports = {
  createBookValidation,
  updateBookValidation,
  handleValidationErrors,
};