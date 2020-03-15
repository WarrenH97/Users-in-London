# Getting list of users in London
This is an API written in Node.js. It calls the bpdts API to retrieve users, filtering these users to only return the ones listed as being in London or whose coordinates are within 50 miles of London.

### How to call
To run the project, all dependencies can be installed by running `npm install`, then run the project using `npm start`.

The root path **"/"** displays a small info page about how to call it. The **"/users"** path returns the list of users in London.

### Tests
There are test in the project that unit test individual functions and integration tests that test functionality when these units are used together. They can be ran with `npm test`.
