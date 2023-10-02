import { Schema, model } from 'mongoose';

const communitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    owner: {
        type: String,
    },
    role: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("community", communitySchema);
