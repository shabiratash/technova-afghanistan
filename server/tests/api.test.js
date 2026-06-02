process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-for-technova';

const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');
const { signToken } = require('../services/token.service');
const { buildListQuery } = require('../services/query.service');

describe('TechNova Afghanistan API smoke tests', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/health').expect(200);

    expect(response.body.status).to.equal('ok');
    expect(response.body.service).to.equal('TechNova Afghanistan API');
  });

  it('returns validation errors before hitting database logic', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'A', email: 'bad-email', password: '123' })
      .expect(422);

    expect(response.body.errors).to.be.an('array');
    expect(response.body.errors.map((error) => error.field)).to.include('email');
  });

  it('rejects protected routes without a JWT', async () => {
    const response = await request(app)
      .post('/api/services')
      .send({})
      .expect(401);

    expect(response.body.message).to.equal('Authentication token required');
  });
});

describe('Security and query unit tests', () => {
  it('hashes user passwords and compares bcrypt hashes', async () => {
    const user = new User({
      name: 'Amina Student',
      email: 'amina@example.com',
      password: 'secret123'
    });

    await user.validate();
    await new Promise((resolve, reject) => {
      User.schema.s.hooks.execPre('save', user, [], (error) => {
        if (error) return reject(error);
        return resolve();
      });
    });

    expect(user.password).to.not.equal('secret123');
    expect(await user.comparePassword('secret123')).to.equal(true);
    expect(await user.comparePassword('wrong-password')).to.equal(false);
  });

  it('signs JWT tokens with user id and role', () => {
    const user = { _id: '665f0f4b18b756a59bfe1111', role: 'admin' };
    const token = signToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded.id).to.equal(user._id);
    expect(decoded.role).to.equal('admin');
  });

  it('builds pagination, sorting and search filters', () => {
    const req = {
      query: {
        page: '2',
        limit: '5',
        search: 'react',
        sortBy: 'price',
        order: 'asc',
        category: 'web-development'
      }
    };

    const query = buildListQuery(req, ['title', 'description']);

    expect(query.page).to.equal(2);
    expect(query.limit).to.equal(5);
    expect(query.skip).to.equal(5);
    expect(query.sort.price).to.equal(1);
    expect(query.filter.category).to.equal('web-development');
    expect(query.filter.$or).to.have.length(2);
  });
});
