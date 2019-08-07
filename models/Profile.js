const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    blog: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    externalImg: {
        type: String
    },
    githubusername: {
        type: String
    },
    hikingprojecttrails: [
        {
            hikeData: {
                type: String,
                required: true
            }
        }],
    hikes: [
        {
            name: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            length: {
                type: String,
            },
            fromDate: {
                type: Date,
            },
            toDate: {
                type: Date,
            },
            description: {
                type: String,
            },
            status: {
                type: String,
                required: true
            },
        }
    ],
    courses: [
        {
            authority: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            completedDate: {
                type: Date,
                required: true
            },
            description: {
                type: String,
            },
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)