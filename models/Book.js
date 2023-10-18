const mongoose = require("mongoose");
const joi = require("joi");

// Book Schema
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 300,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

// validation Create book
const validateCreateBook = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(300).required(),
    author: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().min(10).required(),
  });

  return schema.validate(obj);
};

// validation Update book
const validateUpdateBook = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(300),
    author: Joi.string().trim().min(3).max(100),
    description: Joi.string().trim().min(10),
  });

  return schema.validate(obj);
};

const Book = mongoose.model("Book", BookSchema);
module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
