const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: [40, "Title cannot exceed 40 characters!"]
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Posts || mongoose.model('Posts', PostsSchema);