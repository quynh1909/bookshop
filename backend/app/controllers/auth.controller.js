const AuthService = require("../services/auth.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.createUser = async(req, res, next) => {
    if(!req.body?.hoTen){
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const authService = new AuthService(MongoDB.client);
        const userData = await authService.create(req.body);
        return res.send(userData);
    } catch (error) {
        console.error("Error creating user:", error);
        return next(
            new ApiError(500, `An error occurred: ${error.message}`)
        );
    }

    
};
exports.findUserById = async (req, res, next) => {
    try {
        const authService = new AuthService(MongoDB.client);
        const user = await authService.findUserById(req.params.id);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(user);
    } catch (error) {
        console.error("Error finding user:", error);
        return next(new ApiError(500, `An error occurred: ${error.message}`));
    }
};

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const authService = new AuthService(MongoDB.client);
        const user = await authService.update(req.params.id, req.body);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({message: "user was updated successfully!"});
    } catch (error) {
        return next(
            new ApiError(500, `An error updating user with id=${req.params.id}`)
        );
    }
};

