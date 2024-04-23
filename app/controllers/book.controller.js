const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createBook = async (req, res, next) => {

    if (!req.body?.tuaSach) {
        return next(new ApiError(400, "Tua sách không được để trống"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.createBook(req.body);
        return res.send(document);
    } catch (error) {
        console.error("Error creating book:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.findAllBooks = async (req, res, next) => {
    let documents = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const {tuaSach} = req.query;
        if (tuaSach) {
            documents = await bookService.findByName(tuaSach);
        } else {
            documents = await bookService.find({});
        }
    } catch (error) {
        console.error("Error finding books:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
    return res.send(documents);
};

exports.findBook = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send(document);
    } catch (error) {
        console.error("Error finding book:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.updateBook = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.updateBook(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({ message: "Sách đã được cập nhật thành công!" });
    } catch (error) {
        console.error("Error updating book:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.deleteBook(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({ message: "Sách đã được xóa thành công!" });
    } catch (error) {
        console.error("Error deleting book:", error);
        return next(new ApiError(500, `Không thể xóa sách: ${error.message}`));
    }
};

exports.deleteAllBooks = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deleteCount = await bookService.deleteAllBooks();
        return res.send({ message: `${deleteCount} sách đã được xóa thành công!` });
    } catch (error) {
        console.error("Error deleting books:", error);
        return next(new ApiError(500, `Không thể xóa sách: ${error.message}`));
    }
};

exports.findAllFavorites = async(req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const documents = await bookService.findAllFavorites();
        return res.send(documents);
    } catch (error) {
        console.error("Error fining books:", error);
        return next(
            new ApiError(500, `An error occurred: ${error.message}`)
        );
    }
};