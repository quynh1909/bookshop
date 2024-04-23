const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("books");
    }

    extractBookData(payload) {
        const book = {
            tuaSach: payload.tuaSach,
            tacGia: payload.tacGia,
            theLoai: payload.theLoai,
            nxb: payload.nxb,
            namXuatBan: payload.namXuatBan,
            soLuong: payload.soLuong,
            soLuongCon: payload.soLuongCon,
        };
        // Remove undefined fields
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async createBook(payload) {
        const book = this.extractBookData(payload);
        const result = await this.Book.insertOne( book );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async updateBook(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBookData(payload);

        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }

    async deleteBook(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAllBooks() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }

    async findAllFavorites() {
        return await this.find({ favorite: true });
    }

}

module.exports = BookService;

