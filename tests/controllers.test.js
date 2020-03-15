// Mock set of users instead of hittng API
jest.mock('../utils/users');

const apiController = require('../controllers/api.controller');
const mockUsers = require('./mockdata').mockUsers;

let req, res, next;

const mockResponse = () => {
    const mockRes = {};

    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.render = jest.fn().mockReturnValue(mockRes);
    
    return mockRes;
};

describe("API controller", () => {
    beforeAll(() => {
        req = jest.fn();
        res = mockResponse();
        next = jest.fn();
    });

    it("should return the index page", () => {
        apiController.index(req, res, next);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('index', { title: 'API Home' });
        expect(req).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(0);
    });

    it("should return all users in London", async () => {
        await apiController.getUsersInLondon(req, res, next);

        // Get one user of each condition to be in London
        const userListedInLondon = mockUsers.find(user => user.id === 2);
        const userInRangeOfLondon = mockUsers.find(user => user.id === 3);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            userListedInLondon,
            userInRangeOfLondon
        ]));
        expect(next).toHaveBeenCalledTimes(0);
    });
});