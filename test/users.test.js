const app = require('../app');

const request = require('supertest');
const mongoDB = require('../helpers/database');

const user = request.agent(app);

beforeAll(() => {
    return mongoDB.connect();
});

afterAll(() => {
    return mongoDB.disconnect();
});

describe('users', () => {

    it('able to register', () => {
        return user.post('/users/register')
            .send({email: 'test@test.com', password: '123', confirmPassword: '123'})
            .redirects(1)
            .expect(/Registered successfully/);
    });

    it('able to login a valid user', () => {
        return user.post('/users/login')
            .send({email: 'test@test.com', password: '123'})
            .redirects(1)
            .expect(/Your Quotes/);
    });

    it('add a public quote', () => {
        return user.post('/quotes')
            .send({author: 'Someone', quote: 'Dummy quote', visible: true})
            .redirects(1)
            .expect(/Dummy quote/)
            .expect(/Someone/);
    });

    it('able to log out after loggin in', () => {
        return user.get('/users/logout')
            .redirects(1)
            .expect(/See you/);
    });

    it('unable to login an invalid user', () => {
        return request(app).post('/users/login')
            .send({email: 'user@invalid.com', password: 'invented'})
            .expect(302)
            .expect('Location', '/users/login');
    });

});