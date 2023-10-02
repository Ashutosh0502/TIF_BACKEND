const dbHelper = require('./dbHelper');

const role = {};

role.createRole = async (req) => {
    try {
        const res = await dbHelper.createRole(req.body);
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
};

role.getAll = async (req) => {
    try {
        if (!(req.params.pageNumber && req.params.pagePerSize)) {
            return 'Field Required';
        }
        return await dbHelper.getAll(
            req.params.pageNumber,
            req.params.pagePerSize,
        );
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = role;

