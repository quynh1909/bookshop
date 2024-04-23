const express = require("express");
const books = require("../controllers/book.controller");

const bookRouter =  express.Router();

bookRouter.route("/books")
    .get(books.findAllBooks)
    .post(books.createBook)
    .delete(books.deleteAllBooks);

bookRouter.route("/favorites")
    .get(books.findAllFavorites);

bookRouter.route("/books/:id")
    .get(books.findBook)
    .put(books.updateBook)
    .delete(books.deleteBook);

module.exports = bookRouter;