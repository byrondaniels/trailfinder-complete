const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SharedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    hikeName: {
        type: String,
        required: true,
    },
    hikeUrl: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Shared = mongoose.model('Shared', SharedSchema)