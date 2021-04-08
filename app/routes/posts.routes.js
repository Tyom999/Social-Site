const mwAuth = require('../middleware/mwAuth');
module.exports = app => {
    const postController = require("../controllers/posts.controller");

    const router = require("express").Router();
    // todo mwauth
    // router.use(mwAuth);
    router.post("/add-post", postController.addPost);
    router.post("/add-comment", postController.addComment);
    router.post("/add-reply", postController.addReply);
    router.get('/all-posts',  postController.getAllPosts);
    router.get('/comments/:id',  postController.getCommentsByPostId);
    router.get('/replies/:id',  postController.getReplyByCommentId);

    app.use('/posts', router);
};
