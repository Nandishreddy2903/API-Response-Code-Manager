const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
});

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    images: [imageSchema],
});

const List = mongoose.model('List', listSchema);
module.exports = List;
