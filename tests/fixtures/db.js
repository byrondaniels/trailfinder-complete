const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'cheese'


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Cheese',
    email: 'Cheese@example.com',
    // below is hashed password for beans
    password: '$2y$10$kiCVIaZZXGiPXX77PHveM.ib77qUA9QqJZkF35fwrffsznr6xkLia',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@cheese.com',
    // below is hashed password for mushroom
    password: '$2y$10$LqBIXYMZAstg.YF1LLqbkeyI7Ogi9/e6wuXEjiVUBncHwlIDh9umK',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, JWT_SECRET)
    }]
}

const profileOneId = new mongoose.Types.ObjectId()
const profileOne = {
    _id: profileOneId,
    user: userOneId,
    blog: "a",
    location: "b",
    status: "c",
    skills: ["a", "b", "c"],
    bio: "beans",
    externalImg: 'g',
}

const profileTwoId = new mongoose.Types.ObjectId()
const profileTwo = {
    _id: profileTwoId,
    user: userTwoId,
    blog: "a",
    location: "b",
    status: "c",
    skills: ["a", "b", "c"],
    bio: "beans",
    externalImg: 'g',
}
const commentOneId = new mongoose.Types.ObjectId()
const commentOne = {
    _id: commentOneId,
    user: userOneId,
    text: "W",
}
const postOneId = new mongoose.Types.ObjectId()
const postOne = {
    _id: postOneId,
    user: userOneId,
    text: "W",
    likes: [],
    comments: [commentOne]
}

const postTwoId = new mongoose.Types.ObjectId()
const postTwo = {
    _id: postTwoId,
    user: userOneId,
    text: "E",
    likes: [],
    comments: [{ user: userOneId }]
}

const postThreeId = new mongoose.Types.ObjectId()
const postThree = {
    _id: postThreeId,
    user: userTwoId,
    text: "R",
    likes: [],
    comments: []
}

const sharedOneId = new mongoose.Types.ObjectId()
const sharedOne = {
    _id: sharedOneId,
    user: userOneId,
    text: "W",
    likes: [],
    comments: [commentOne]
}

const sharedTwoId = new mongoose.Types.ObjectId()
const sharedTwo = {
    _id: sharedTwoId,
    user: userOneId,
    text: "E",
    likes: [],
    comments: [{ user: userOneId }]
}


const setupDatabase = async () => {
    await Post.deleteMany()
    await Profile.deleteMany()
    await Shared.deleteMany()
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Profile(profileOne).save()
    await new Profile(profileTwo).save()
    await new Post(postOne).save()
    await new Post(postTwo).save()
    await new Post(postThree).save()
    await new Shared(sharedOne).save()
    await new Shared(sharedTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    profileOne,
    profileOneId,
    profileTwo,
    profileTwoId,
    postOne,
    postOneId,
    postTwo,
    postTwoId,
    postThree,
    postThreeId,
    commentOneId,
    sharedOneId,
    sharedTwoId,
    setupDatabase
}