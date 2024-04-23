const PublisherService = require("../services/publisher.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createPublisher = async (req, res, next) => {
    if (!req.body?.tenNXB) {
        return next(new ApiError(400, "Tên NXB không được để trống"));
    }

    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.createPublisher(req.body);
        return res.send(document);
    } catch (error) {
        console.error("Error creating publisher:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.findAllPublishers = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const documents = await publisherService.find({});
        return res.send(documents);
    } catch (error) {
        console.error("Error finding publishers:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.findPublisher = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        return res.send(document);
    } catch (error) {
        console.error("Error finding publisher:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.updatePublisher = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
    }

    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.updatePublisher(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        return res.send({ message: "Nhà xuất bản đã được cập nhật thành công!" });
    } catch (error) {
        console.error("Error updating publisher:", error);
        return next(new ApiError(500, `Đã xảy ra lỗi: ${error.message}`));
    }
};

exports.deletePublisher = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.deletePublisher(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        return res.send({ message: "Nhà xuất bản đã được xóa thành công!" });
    } catch (error) {
        console.error("Error deleting publisher:", error);
        return next(new ApiError(500, `Không thể xóa nhà xuất bản: ${error.message}`));
    }
};

exports.deleteAllPublishers = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const deleteCount = await publisherService.deleteAllPublishers();
        return res.send({ message: `${deleteCount} nhà xuất bản đã được xóa thành công!` });
    } catch (error) {
        console.error("Error deleting publishers:", error);
        return next(new ApiError(500, `Không thể xóa nhà xuất bản: ${error.message}`));
    }
};
