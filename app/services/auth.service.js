const { ObjectId } = require("mongodb");

class AuthService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    extractUserData(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async createUser(payload) {
        try {
            const user = this.extractUserData(payload);
            const result = await this.User.findOneAndUpdate(
                user, 
                { $set: user }, 
                { returnDocument: "after", upsert: true } 
            );
            return result.value;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
    
    
    async findUserById(id) {
        try {
            return await this.User.findOne({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
        } catch (error) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }
    
}

module.exports = AuthService;