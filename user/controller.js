const dbHelper = require('./dbHelper');

const users = {};

users.add = async (req) => {
    try {
        const res = await dbHelper.save(req.body);
        const { password: hashedPassword, ...rest } = res._doc;
        return rest;
    } catch (err) {
        return Promise.reject(err);
    }
};

users.validate = async (model) => {
    try {
        return await dbHelper.validate(model);
    } catch (err) {
        return Promise.reject(err);
    }
};


module.exports = users;