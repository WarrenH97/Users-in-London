const geolib = require('geolib');

/**
 * Gets all users within a specified distance of a map coordinate
 * @param {Array} users Array of user objects
 * @param {Number} lat Latitude of target location
 * @param {Number} long Longitude of target location
 * @param {Number} maxDistance Max distance in miles user can be from target location
 */
exports.getUsersInRange = (users, lat, long, maxDistance) => {
    const usersFilted = users.filter(user => {
        const userDistance = getDistance(lat, long, user.latitude, user.longitude);
        return userDistance <= maxDistance;
    });

    return usersFilted;
};

/**
 * Gets the distance in miles between two coordinates
 * @param {Number} lat1 lat of start point
 * @param {Number} lng1 long of start point
 * @param {Number} lat2 lat of end point
 * @param {Number} lng2 long of end point
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
    // Check to ensure each coord has a value
    if (lat1 == null || lng1 == null || 
        lat2 == null || lng2 == null) {
        return 0;
    }

    // Construct lat long objects for geolib
    const start = { latitude: lat1, longitude: lng1 };
    const end = { latitude: lat2, longitude: lng2 };

    // Get distance and covert to miles
    const distMeters = geolib.getDistance(start, end);
    const distMiles = geolib.convertDistance(distMeters, "mi");

    return distMiles;
};

// Export for testing
exports.getDistance = getDistance;