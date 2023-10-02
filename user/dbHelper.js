const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const users = require('./model');

const usersDbHelper = {};

usersDbHelper.save = async (usersInput) => {
    try {
        return users.countDocuments({ email: usersInput.email }).then((count) => {
            if (count === 0) {
                usersInput.password = usersInput.password;
                return bcrypt.hash(usersInput.password, saltRounds).then((encryptedPassword) => {
                    let newUser = JSON.parse(JSON.stringify(usersInput));
                    newUser.password = encryptedPassword;

                    const obj = new users(newUser);
                    return obj.save().then(() => { return obj; });
                });

            } else {
                return 'user exist';
            }
        });

    } catch (err) {
        return Promise.reject(err);
    }
};

usersDbHelper.validate = async (model) => {
    try {
        return users.findOne({ email: model.email }).exec().then((u) => {
            if (u) {
                const payload = {
                    name: u.name,
                    id: u._id,
                    email: u.email
                };
                const options = { expiresIn: '1d', issuer: process.env.ISSUER };

                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);


                const match = bcrypt.compareSync(model.password, u.password);
                if (match) {
                    return u.updateOne({ token }).then(() => {

                        return { match, token, payload };
                    });
                }
                return { match };
            }

            return Promise.reject("user not exist");
        });

    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = usersDbHelper;