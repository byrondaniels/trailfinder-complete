const request = require('supertest')
const app = require('../server')

const { setupDatabase, userTwo, userOne } = require('./fixtures/db')

test('Good math', () => {
    expect(2).toBe(2)
})

let token
let token2
let response

beforeEach(async () => {
    await setupDatabase()
    token = await request(app).post('/api/auth/').send({
        email: userOne.email,
        password: 'beans'
    }).then(res => res.body.token)

    token2 = await request(app).post('/api/auth/').send({
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
test('Should find no profile for user', async () => {
    response = await request(app)
        .get('/api/profile/me/')
        .set('x-auth-token', `${token2}`)
        .send()
        .then(res => res.body.msg)
    expect(response).toBe('There is no profile for this user')
})

test('Create profiles for user', async () => {

    response = await request(app)
        .post('/api/profile/')
        .set('x-auth-token', `${token2}`)
        .send({
            blog: '11',
            location: '22',
            bio: "33",
            externalImg: "44",
            status: "Beginner hiker",
            skills: "Swimming biking"
        })
        .expect(200)

})
//

test('Update profile for user', async () => {

    let blog = '111'
    let location = '122'
    let bio = "133"
    let externalImg = "144"
    let status = "Advanced hiker"

    let skills = "Swimming,cheese"

    response = await request(app)
        .post('/api/profile/')
        .set('x-auth-token', `${token2}`)
        .send({
            blog: blog,
            location: location,
            bio: bio,
            externalImg: externalImg,
            status: status,
            skills: skills,
        })
    expect(response.body.blog).toBe(blog)
    expect(response.body.location).toBe(location)
    expect(response.body.bio).toBe(bio)
    expect(response.body.externalImg).toBe(externalImg)
    expect(response.body.status).toBe(status)
    expect(response.body.skills).toStrictEqual(skills.split(","))
})

test('Should find a profile for user', async () => {

    response = await request(app)
        .get('/api/profile/me/')
        .set('x-auth-token', `${token}`)
        .send()
        .then(res => res.body.location)
    expect(response).toBe("b")
})
