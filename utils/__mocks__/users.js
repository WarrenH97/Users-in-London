const mockUsers = require('../../tests/mockdata').mockUsers;

module.exports = {
    /**
     * Gets all mock users
     * @returns array of all users
     */
    getAllUsers: async () => {
        console.log("This is the mock getAllUsers");
        return Promise.resolve(mockUsers);
    },

    /**
     * Gets all mock users listed in a city
     * @param {String} city the city to get users for
     * @returns array of users in the the specified city
     */
    getUsersInCity: async (city) => {
        console.log("This is the mock getUsersInCity");
        return Promise.resolve(mockUsers.filter(user => user.city === city));
    },

    /**
     * Gets mock user by id
     * @param {number} id user ID
     * @returns object of user with specified ID
     */
    getUserByID: async (id) => {
        console.log("This is the mock getUserByID");
        return Promise.resolve(mockUsers.find(user => user.id === id));
    }
};