import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    name: {
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

module.exports = model("role", roleSchema);
