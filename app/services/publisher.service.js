const { ObjectId } = require("mongodb");

class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("publishers");
    }

    extractPublisherData(payload) {
        const publisher = {
            tenNXB: payload.tenNXB,
            diaChi: payload.diaChi,
            email: payload.email,
            soDienThoai: payload.soDienThoai,
        };
        // Remove undefined fields
        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    async createPublisher(payload) {
        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.insertOne(publisher);
        return result.ops[0];
    }

    async find(filter) {
        const cursor = await this.Publisher.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async updatePublisher(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractPublisherData(payload);

        const result = await this.Publisher.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }

    async deletePublisher(id) {
        const result = await this.Publisher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAllPublishers() {
        const result = await this.Publisher.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = PublisherService;
