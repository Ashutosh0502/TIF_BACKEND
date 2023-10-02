const dbHelper = require('./dbHelper');
const memberDbHelper = require('../member/dbHelper');
const roleDbHelper = require('../role/dbHelper');


const community = {};

community.createCommunity = async (req) => {
    try {
        const res = await dbHelper.createCommunity({ ...req.body, owner: req.decoded.id, slug: req.body.name, role: 'Community Admin' });
        const { role, ...rest } = res._doc;
        return rest;
    } catch (err) {
        return Promise.reject(err);
    }
};

community.getAll = async (req) => {
    try {
        if (!(req.params.pageNumber && req.params.pagePerSize)) {
            return 'Field Required';
        }
        const data = await dbHelper.getAll(
            req.params.pageNumber,
            req.params.pagePerSize,
        );
        const result = data.map(item => {
            return {
                id: item._id,
                name: item.name,
                slug: item.slug,
                owner: {
                    id: item.owner,
                    name: req.decoded.name,
                },
                created_at: item.createdDate,
                updated_at: item.modifiedDate
            };
        });

        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

community.getAllCommunityMember = async (req) => {
    try {
        if (!(req.params.pageNumber && req.params.pagePerSize && req.params.id)) {
            return 'Field Required';
        }
        const members = await memberDbHelper.getMemberByCommunityId(req.params.id);
        const result = await Promise.all(members.map(async (item) => {
            const userRole = await roleDbHelper.getRoleById(item.role);
            return {
                id: item._id,
                community: item.community,
                user: {
                    id: req.decoded.id,
                    name: req.decoded.name,
                },
                role: {
                    id: item.role,
                    name: userRole,
                },
                created_at: item.createdDate,
            };
        }));
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

community.getMyOwnedCommunity = async (req) => {
    try {
        if (!(req.params.pageNumber && req.params.pagePerSize)) {
            return 'Field Required';
        }
        const data = await dbHelper.getMyOwnedCommunity(
            req.params.pageNumber,
            req.params.pagePerSize,
            req.decoded.id,
        );
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
};

community.getMyJoinedCommunity = async (req) => {
    try {
        if (!(req.params.pageNumber && req.params.pagePerSize)) {
            return 'Field Required';
        }
        const data = await dbHelper.getMyJoinedCommunity(
            req.params.pageNumber,
            req.params.pagePerSize,
        );
        const result = data.map(item => {
            return {
                id: item._id,
                name: item.name,
                slug: item.slug,
                owner: {
                    id: req.decoded.id,
                    name: req.decoded.name,
                },
                created_at: item.createdDate,
                updated_at: item.modifiedDate
            };
        });
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = community;