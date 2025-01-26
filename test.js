let request = require('supertest'); // For testing the REST API
let app = require('./index');
//let jest = require('jest');

describe('Epoch Consumer Service', () => {

    test('should fetch epoch timestamp from storage', async () => {
        // Mock the data retrieval logic
        let mock_get_epoch_from_storage = jest.fn().mockReturnValue(1672531200);
        let timestamp = await mock_get_epoch_from_storage();

        expect(timestamp).toBe(1672531200);
    });

    test('should return human-readable time via REST API', async () => {
        let response = await request(app).get('/timestamp');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('formatted_time');
        expect(new Date(response.body.formatted_time)).toBeInstanceOf(Date);
    });
});
