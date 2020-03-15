const fetch = require('node-fetch');
const baseURL = require('../config').BPDTSBaseURL;

module.exports = {
    /**
     * Gets all users
     * @returns array of all users
     */
    getAllUsers: async () => {
        const res = await fetch(`${baseURL}users`);
        checkStatus(res);
        const json = await res.json();

        return json;
    },

    /**
     * Gets users listed in a city
     * @param {String} city the city to get users for
     * @returns array of users in the the specified city
     */
    getUsersInCity: async (city) => {
        if (!city) throw new Error("'getUsersInCity()' No city provided!");

        const res = await fetch(`${baseURL}city/${city}/users`);
        checkStatus(res);
        const json = await res.json();

        return json;
    },

    /**
     * Gets user by id, the return user object includes a "city" key
     * @param {number} id user ID
     * @returns object of user with specified ID
     */
    getUserByID: async (id) => {
        if (!id) throw new Error("'getUserByID()' No ID provided!");

        const res = await fetch(`${baseURL}user/${id}`);
        checkStatus(res);
        const json = await res.json();

        return json;
    }
};

/**
 * Checks the response status of the request, returns response if OK
 * @param {res} res response from the request
 * @returns the response unmodified
 * @throws error if response is not Success (2xx)
 */
function checkStatus(res) {
    if (res.ok) {   // res.status >= 200 && res.status < 300
        return res;
    } else {
        const err = new Error(`${res.status}: ${res.statusText}`);
        err.response = res;
        throw err;
    }
}