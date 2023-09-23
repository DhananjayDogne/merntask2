const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
    },
    likes: []
       

});

module.exports = mongoose.model('Post', PostSchema);