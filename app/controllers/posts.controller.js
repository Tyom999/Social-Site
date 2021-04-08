const db = require("../models");
const Posts = db.posts;
const Comments = db.comments;
const Replies = db.replies;

exports.addPost = async (req, res) => {
    const newPost = {
        userId: req.body.userId,
        nickname: req.body.nickname,
        title: req.body.title,
        description: req.body.description,
    };
    Posts.create(newPost)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

exports.getAllPosts = async (req, res) => {
    Posts.findAll({order: [['updatedAt', 'DESC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};

exports.addComment = async (req, res) => {
    Comments.create({
        postId: req.body.postId,
        nickname: req.body.nickname,
        comment: req.body.comment
    })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment."
            });
        });
};

exports.getCommentsByPostId = async (req, res) => {
    Comments.findAll({
        where: {
            postId: req.params.id
        },
        order: [
            ['updatedAt', 'ASC']
        ]
    },)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment."
            });
        });
};
exports.addReply = async (req, res) => {

    Replies.create({
        commentId: req.body.commentId,
        nickname: req.body.nickname,
        reply: req.body.reply
    })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment's reply."
            });
        });
};

exports.getReplyByCommentId = async (req, res) => {
    Replies.findAll({
        where: {
            commentId: req.params.id
        },
        order: [
            ['updatedAt', 'ASC']
        ]
    },)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the replies."
            });
        });
};