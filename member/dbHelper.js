const Member = require('./model');

const memberDbHelper = {};

memberDbHelper.addMember = async (input) => {
    try {
        const obj = await Member(input);
        const result = obj.save().then(() => obj);
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

memberDbHelper.deleteMember = async (id) => {
    try {
        const data = await Member.updateOne({ _id: id }, { active: false, modifiedDate: Date.now() });
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
}

memberDbHelper.getMemberByCommunityId = async (CommunityId) => {
    try {
        return await Member.find({ "community": CommunityId });
    } catch (err) {
        return Promise.reject(err);
    }
}

memberDbHelper.getByUserAndCommunityId = async (userId, CommunityId) => {
    try {
        return await Member.find({ "user": userId, "community": CommunityId });
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = memberDbHelper;