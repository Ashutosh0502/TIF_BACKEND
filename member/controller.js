const dbHelper = require('./dbHelper');
const roleDbHelper = require('../role/dbHelper');
const communityDbHelper = require('../community/dbHelper');

const member = {};

member.addMember = async (req) => {
    try {
        const userRole = await roleDbHelper.getRoleById(req.body.role);
        const getCommunity = await communityDbHelper.getByCommunityId(req.body.community);
        if (getCommunity.length === 0) return {
            "status": false,
            "errors": [
                {
                    "param": "community",
                    "message": "Community not found.",
                    "code": "RESOURCE_NOT_FOUND"
                }
            ]
        };
        const getDataByUserAndCommunityId = await dbHelper.getByUserAndCommunityId(req.body.user, req.body.community);
        if (getDataByUserAndCommunityId.length !== 0) return {
            "status": false,
            "errors": [
                {
                    "message": "User is already added in the community.",
                    "code": "RESOURCE_EXISTS"
                }
            ]
        };
        const errMessage = {
            "status": false,
            "errors": [
                {
                    "message": "You are not authorized to perform this action.",
                    "code": "NOT_ALLOWED_ACCESS"
                }
            ]
        };
        if (userRole != 'Community Admin') {
            return errMessage;
        }
        const res = await dbHelper.addMember(req.body);
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
};

member.deleteMember = async (req) => {
    try {
        const userRole = await communityDbHelper.getOwnerById(req.decoded.id);
        if (userRole === 'denied' || (userRole !== 'Community Admin' && userRole !== 'Community Moderator')) {
            return 'NOT_ALLOWED_ACCESS';
        }
        const res = await dbHelper.deleteMember(req.params.id);
        const errMessage = {
            "status": false,
            "errors": [
                {
                    "message": "Member not found.",
                    "code": "RESOURCE_NOT_FOUND"
                }
            ]
        };
        if (res.nModified === 0) return errMessage;
        return true;
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = member;

