const Community = require('./model');

const communityDbHelper = {};

communityDbHelper.createCommunity = async (input) => {
    try {
        const obj = await Community(input);
        const result = obj.save().then(() => obj);
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

communityDbHelper.getAll = async (pageNumber, nPerPage) => {
    try {
        const communityData = await Community.find({ active: true })
            .sort({ createdDate: -1 })
            .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
            .limit(Number(nPerPage));
        return communityData;
    } catch (error) {
        return Promise.reject(error);
    }
};

communityDbHelper.getMyOwnedCommunity = async (pageNumber, nPerPage) => {
    try {
        return await Community.find({ active: true })
            .sort({ createdDate: -1 })
            .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
            .limit(Number(nPerPage))
            .then((results) => {
                return results.map((result) => {
                    return {
                        id: result._id,
                        name: result.name,
                        slug: result.slug,
                        owner: result.owner,
                        createdDate: result.createdDate,
                        updatedDate: result.modifiedDate,
                    }
                });
            });

    } catch (error) {
        return Promise.reject(error);
    }
};

communityDbHelper.getMyJoinedCommunity = async (pageNumber, nPerPage, id) => {
    try {
        const getMyJoinedCommunityData = await Community.find({ active: true })
            .sort({ createdDate: -1 })
            .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
            .limit(Number(nPerPage));
        return getMyJoinedCommunityData;
    } catch (error) {
        return Promise.reject(error);
    }
};

communityDbHelper.getOwnerById = async (id) => {
    try {
        const data = await Community.findOne({
            owner: id
        });
        return data ? data.role : 'denied';
    } catch (err) {
        return Promise.reject(err);
    }
}

communityDbHelper.getByCommunityId = async (CommunityId) => {
    try {
        return await Community.find({ _id: CommunityId });
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = communityDbHelper;