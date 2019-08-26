const request = require('supertest')
const app = require('../server')

const { setupDatabase, userTwo, userOne, postOneId, postTwoId, commentOneId } = require('./fixtures/db')

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

test('Should create a post', async () => {
    const req = await request(app)
        .post('/api/posts/')
        .set('x-auth-token', `${token}`)
        .send({ text: "1", })
    expect(req.text).toBe("1");
})

test('Should get all posts ', async () => {
    const req = await request(app)
        .get('/api/posts/')
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(3)
})


test('Get posts by id 1 ', async () => {
    const req = await request(app)
        .get(`/api/posts/${postOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.text).toBe('W')
})


test('Get posts by id 2 ', async () => {
    const req = await request(app)
        .get(`/api/posts/${postTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.text).toBe('E')
})

test('Delete a post by id ', async () => {
    const req = await request(app)
        .delete(`/api/posts/${postTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.msg).toBe('Post removed')
})

test('Try to delete a post with bad id ', async () => {
    const req = await request(app)
        .delete(`/api/posts/13232`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.msg).toBe('Post not found')
})

test('Try to delete a post not created by user ', async () => {
    const req = await request(app)
        .delete(`/api/posts/${postTwoId}`)
        .set('x-auth-token', `${token2}`)
        .send()
    expect(req.msg).toBe('User not authorized')
})


test('Like a post not yet liked', async () => {
    const req = await request(app)
        .put(`/api/posts/like/${postOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(1)
})

test('Like a post already liked', async () => {
    const req = await request(app)
        .put(`/api/posts/like/${postTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.msg).toBe('Post already liked')
})


test('Unlike a post', async () => {
    const req = await request(app)
        .put(`/api/posts/unlike/${postTwoId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(0)
})

test('Comment on a post', async () => {
    const req = await request(app)
        .post(`/api/posts/comment/${postTwoId}`)
        .set('x-auth-token', `${token}`)
        .send({ text: "4" })
    expect(req.length).toBe(1)
})

test('Get all comments from a post ', async () => {
    const req = await request(app)
        .get(`/api/posts/${postOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.comments.length).toBe(1)
})

test('Delete comment on a post ', async () => {
    const req = await request(app)
        .delete(`/api/posts/comment/${postOneId}/${commentOneId}`)
        .set('x-auth-token', `${token}`)
        .send()
    expect(req.length).toBe(0)
})