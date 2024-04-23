const express = require("express");
const publishers = require("../controllers/publisher.controller");

const publisherRouter =  express.Router();

publisherRouter.route("/publishers")
    .get(publishers.findAllPublishers)
    .post(publishers.createPublisher)
    .delete(publishers.deleteAllPublishers);

publisherRouter.route("/publishers/:id")
    .get(publishers.findPublisher)
    .put(publishers.updatePublisher)
    .delete(publishers.deletePublisher);

module.exports = publisherRouter;