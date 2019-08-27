const request = require('supertest')
const app = require('../server')

const { userOneId, userTwoId, userOne, userTwo, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Good math', () => {
    expect(2).toBe(2)
})

test('Should signup a new user', async () => {
    let name = 'beans'
    let email = 'beans2@example.com'
    let password = 'MyPass777!'
    let response = await request(app).post('/api/users/').send({
        name: name,
        email: email,
        password: password
    })
    expect(response.body.token).not.toBeNull()

    let user = await request(app).get('/api/auth/')
        .set('x-auth-token', `${response.body.token}`)

    expect(user.body.name).toBe(name)
    expect(user.body.email).toBe(email)
    expect(user.body._id).not.toBe('cheese')

    name = 'cheese'
    email = 'cheese2@example.com'
    password = 'cheese696969!'
    response = await request(app).post('/api/users/').send({
        name: name,
        email: email,
        password: password
    })
    expect(response.body.token).not.toBeNull()

    user = await request(app).get('/api/auth/')
        .set('x-auth-token', `${response.body.token}`)

    expect(user.body.name).toBe(name)
    expect(user.body.email).toBe(email)
    expect(user.body._id).not.toBe('cheese')
})

test('Should login existing pizza user', async () => {

    let response = await request(app).post('/api/auth/').send({
        email: userOne.email,
        password: 'beans'
    })
    expect(response.body.token).not.toBeNull()
    user = await request(app).get('/api/auth/')
        .set('x-auth-token', `${response.body.token}`)

    expect(user.body.name).toBe(userOne.name)
    expect(user.body.email).toBe(userOne.email)
    expect(user.body._id).toBe(userOneId.toHexString())

    response = await request(app).post('/api/auth/').send({
        email: userTwo.email,
        password: 'mushroom'
    })
    expect(response.body.token).not.toBeNull()
    user = await request(app).get('/api/auth/')
        .set('x-auth-token', `${response.body.token}`)

    expect(user.body.name).toBe(userTwo.name)
    expect(user.body.email).toBe(userTwo.email)
    expect(user.body._id).toBe(userTwoId.toHexString())
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/api/auth/').send({
        email: userOne.email,
        password: 'ihatecheese'
    }).expect(400)
})

let token

beforeEach(async () => {
    token = await request(app).post('/api/auth/').send({
        email: userTwo.email,
        password: 'mushroom'
    }).then(res => res.body.token)
})

test('Should get data for user', async () => {
    await request(app)
        .get('/api/auth/')
        .set('x-auth-token', `${token}`)
        .send()
        .expect(200)
})

test('Should NOT get data for user', async () => {
    await request(app)
        .get('/api/auth/')
        .set('x-auth-token', `cheese`)
        .send()
        .expect(401)
})

// Need test for deleting user



