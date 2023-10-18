const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");

/**
 * @desc   Get all books
 * @route  /api/v1/books
 * @method GET
 * @access public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  let booksList;
  const bookPerPage = 5;
  const { minPrice, maxPrice, pageNumber } = req.query;
  if (pageNumber && maxPrice && minPrice) {
    booksList = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .skip(bookPerPage * (parseInt(pageNumber) - 1))
      .limit(bookPerPage);
  } else if (pageNumber) {
    booksList = await Book.find()
      .skip(bookPerPage * (parseInt(pageNumber) - 1))
      .limit(bookPerPage);
  } else {
    booksList = await Book.find();
  }
  res.status(200).json(booksList);
});

/**
 * @desc   Get book by id
 * @route  /api/v1/books/:id
 * @method GEt
 * @access public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc   Create new book
 * @route  /api/v1/books
 * @method POST
 * @access public
 */
const CreateNewBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await book.save(book);
  res.status(201).json(result);
});

/**
 * @desc   Update a book
 * @route  api/v1/books/:id
 * @method PUT
 * @access public
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const UpdatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  res.status(200).json(UpdatedBook);
});

/**
 * @desc   Delete a book
 * @route  api/v1/books/:id
 * @method DELETE
 * @access private (only admin)
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "book has been deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  CreateNewBook,
  updateBook,
  deleteBook,
};
