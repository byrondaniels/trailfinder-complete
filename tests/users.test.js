const request = require('supertest')
const app = require('../server')

const { setupDatabase } = require('./fixtures/db')

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
})
