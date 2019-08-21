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


const setupDatabase = async () => {
    await Post.deleteMany()
    await Profile.deleteMany()
    await Shared.deleteMany()
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Profile(profileOne).save()

}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    // taskOne,
    // taskTwo,
    // taskThree,
    setupDatabase
}