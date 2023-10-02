import { Schema, model } from 'mongoose';

const memberSchema = new Schema({
    community: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
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

module.exports = model("member", memberSchema);
