module.exports = app => {
    const router = require("express").Router();
    const usersController = require("../controllers/users.controller");

    //todo mwAuth
    router.post('/getSearchedUsers', usersController.getSearchedUsers);
    router.get('/getAllUsers', usersController.getAllUsers);
    router.put('/userBlock', usersController.userBlock);
    router.post('/getFriends', usersController.getFriends);
    router.post('/getPendingRequests', usersController.getPendingRequests);
    router.post('/answerFriendRequest', usersController.answerFriendRequest);

    app.use('/users', router);
};




