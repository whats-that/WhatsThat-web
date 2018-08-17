const request = require('supertest');
const app = require('../index')

describe(' /POST image', () => {
  it('should be able to make a request to google server', async () => {
    await request(app).post('/api/server/getDataFromGoogleAPI').expect(200);
  })
});
