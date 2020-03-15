// Mock retrieval of users instead of hittng API
jest.mock('../utils/users');

const users = require('../utils/users');
const helper = require('../utils/helper');
const { LondonData } = require('../config');

describe("getting distance in miles between two coords", () => {
    const { lat, long } = LondonData;

    it("should calculate the distance between London and Sheffield", () => {
        const distance = helper.getDistance(53.381130, -1.470085, lat, long);

        expect(distance).toBeGreaterThan(141);
        expect(distance).toBeLessThan(142);
    });

    it("should return 0 if missing a value", () => {
        const distance = helper.getDistance(undefined, -1.470085, lat, long);

        expect(distance).toBe(0);
    });

    it("should return 0 if all points are 0", () => {
        const distance = helper.getDistance(0, 0, 0, 0);

        expect(distance).toBe(0);
    });

    it("should return a distance if one of the points is 0", () => {
        const distance = helper.getDistance(53.381130, 0, lat, long);

        expect(distance).toBeGreaterThan(0);
    });
});

describe('getting all users within range of a lat long', () => {
    const { lat, long } = LondonData;
    let allUsers = [];

    beforeAll(async () => {
        allUsers = await users.getAllUsers();
    });

    it('should get users within 50 miles', () => {
        const usersInRange = helper.getUsersInRange(allUsers, lat, long, 50);

        expect(usersInRange.length).toBe(2);
        expect(usersInRange[0]).toHaveProperty('id', 1);
        expect(usersInRange[1]).toHaveProperty('id', 3);
    });
    
    it('should return no users if no users retrieved from api', () => {
        const usersInRange = helper.getUsersInRange([], lat, long, 50);

        expect(usersInRange.length).toBe(0);
    });
});
