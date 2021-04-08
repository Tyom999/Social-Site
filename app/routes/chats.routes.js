module.exports = app => {
    const router = require("express").Router();
    const chatsController = require("../controllers/chats.controller.js");
    // todo mwauth
    router.post('/getAllMsg', chatsController.getAll);
    router.get('/getRatingById/:id', chatsController.getRatingById);
    router.post('/setRate', chatsController.setRate);

    app.use('/chats', router);
};
