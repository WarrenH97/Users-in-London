const users = require('../utils/users');
const helper = require('../utils/helper');
const { MaxDistance, LondonData } = require('../config');

/**
 * Gets a list of users known to be in London based on Lat Long or
 * if they're listed as living there
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @param {Function} next call the next middleware function
 */
exports.getUsersInLondon = async (req, res, next) => {
    try {
        const { lat, long, cityName } = LondonData;

        // Get all users and users listed in London from API
        const allUsers = await users.getAllUsers();
        const londonListedUsers = await users.getUsersInCity(cityName);

        // Get users within range of the centre of London
        const usersInRange = helper.getUsersInRange(allUsers, lat, long, MaxDistance);

        // Join arrays of users in London
        const allLondonUsers = londonListedUsers.concat(usersInRange);

        return res.status(200).json(allLondonUsers);
    } catch (err) {
        return next(err);
    }
};