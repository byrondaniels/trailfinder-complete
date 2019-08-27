const request = require('supertest')
const app = require('../server')

const { setupDatabase, userTwo, userOne, sharedOneId, sharedTwoId, commentOneId } = require('./fixtures/db')

let token
let token2

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

test('Should save shared trail', async () => {
    const req = await request(app)
        .post('/api/shared/')
        .set('x-auth-token', `${token}`)
        .send({ text: "1", })
    expect(req.text).toBe("1");
})

test('Should get all shared trails ', async () => {
    const req = await request(app)
        .get('/api/shared/')
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(3)
})


test('Get shared by id 1 ', async () => {
    const req = await request(app)
        .get(`/api/shared/${sharedOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.text).toBe('W')
})


test('Get shared by id 2 ', async () => {
    const req = await request(app)
        .get(`/api/shared/${sharedTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.text).toBe('E')
})

test('Delete a shared by id ', async () => {
    const req = await request(app)
        .delete(`/api/shared/${sharedTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.msg).toBe('Post removed')
})

test('Try to delete a share with bad id ', async () => {
    const req = await request(app)
        .delete(`/api/shared/13232`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.msg).toBe('Post not found')
})

test('Try to delete a share not created by user ', async () => {
    const req = await request(app)
        .delete(`/api/shared/${sharedTwoId}`)
        .set('x-auth-token', `${token2}`)
        .send()
    expect(req.msg).toBe('User not authorized')
})


test('Like a shared post not yet liked', async () => {
    const req = await request(app)
        .put(`/api/shared/like/${sharedOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(1)
})

test('Like a shared post already liked', async () => {
    const req = await request(app)
        .put(`/api/shared/like/${sharedTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.msg).toBe('Post already liked')
})


test('Unlike a share', async () => {
    const req = await request(app)
        .put(`/api/shared/unlike/${sharedTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(0)
})

test('Comment on a share', async () => {
    const req = await request(app)
        .post(`/api/shared/comment/${sharedTwoId}`)
        .set('x-auth-token', `${token}`)
        .send({ text: "4" })
    expect(req.length).toBe(1)
})

test('Get all comments from a share ', async () => {
    const req = await request(app)
        .get(`/api/shared/${sharedOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.comments.length).toBe(1)
})

test('Delete comment on a share ', async () => {
    const req = await request(app)
        .delete(`/api/shared/comment/${sharedOneId}/${commentOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(0)
})