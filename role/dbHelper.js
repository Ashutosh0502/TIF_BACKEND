const Role = require('./model');

const roleDbHelper = {};

roleDbHelper.createRole = async (input) => {
    try {
        const obj = await Role(input);
        const result = obj.save().then(() => obj);
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

roleDbHelper.getAll = async (pageNumber, nPerPage) => {
    try {
        const roleData = await Role.find({ active: true })
            .sort({ createdDate: -1 })
            .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
            .limit(Number(nPerPage));
        return roleData;
    } catch (error) {
        return Promise.reject(error);
    }
};

roleDbHelper.getRoleById = async (id) => {
    try {
        const data = await Role.findOne({ _id: id });
        return data.name;
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = roleDbHelper;