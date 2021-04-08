const db = require("../models");
const Users = db.users;
const Friends = db.friends;
const PendingRequest = db.pendingRequests;
const {Op} = require("sequelize");

exports.getSearchedUsers = async (req, res) => {
    try {
        let sql1 = ` 
    SELECT users.id, users.nickname FROM users WHERE users.id <> ${req.body.user1Id} AND users.admin = false  AND 
    users.isBlocked = false AND users.nickname LIKE '%${req.body.nickname}%'`;
        let [usersByNickname] = await db.sequelize.query(sql1);

        let sql2 = `SELECT id from users where id in(select user2Id from friends where user1Id = ${req.body.user1Id}
         union Select user1Id from friends where user2Id = ${req.body.user1Id} )`;

        let sql3 = `SELECT id from users where id in(select user2Id from pendingRequests where user1Id = ${req.body.user1Id}
         union Select user1Id from pendingRequests where user2Id = ${req.body.user1Id} )`;

        let [friends] = await db.sequelize.query(sql2);

        let [pendingRequests] = await db.sequelize.query(sql3);
        let searchedUsers = usersByNickname;
        usersByNickname.forEach(user => {
            friends.forEach(friend => {
                if (friend.id === user.id) {
                    searchedUsers = searchedUsers.filter(searchedUser => searchedUser.id !== friend.id);
                }
            })
        });
        usersByNickname.forEach(user => {
            pendingRequests.forEach(pendingRequest => {
                if (pendingRequest.id === user.id) {
                    searchedUsers = searchedUsers.filter(searchedUser => searchedUser.id !== pendingRequest.id);
                }
            })
        });
        if (searchedUsers.length > 0) {
            res.status(201).json({
                users: searchedUsers
            });
        } else {
            res.status(201).json({
                users: []
            });
        }
    } catch (e) {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        let allUsers = await Users.findAll({where: {admin: false}});
        res.status(201).json({
            allUsers
        });
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: "Something went wrong with getting all users"
        });
    }
};
exports.userBlock = async (req, res) => {
    try {
        let user = await Users.findOne({where: {id: req.body.userId}});
        if (user) {
            await Users.update({isBlocked: req.body.isBlocked}, {where: {id: req.body.userId}});
            res.status(201).json({
                msg: 'User blocked'
            });
        }
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: "Something went wrong with blocking user"
        });
    }
};
exports.getFriends = async (req, res) => {
    try {
        let friends = await Friends.findAll({
            where: {
                [Op.or]: {
                    user1Id: req.body.userId,
                    user2Id: req.body.userId
                }
            }
        });
        if (friends) {
            res.status(201).json({
                friends
            });
        }
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: "Something went wrong with getting friends"
        });
    }
};
exports.getPendingRequests = async (req, res) => {
    try {
        setTimeout(async () => {
            let pendingRequests = await PendingRequest.findAll({where: {user2Id: req.body.userId}});
            res.status(201).json({
                pendingRequest: pendingRequests
            });
        }, 1000)
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: "Something went wrong with getting pending requests"
        });
    }
};
exports.answerFriendRequest = async (req, res) => {
    try {
        await PendingRequest.destroy({where: {user2Id: req.body.userId}});
        if (req.body.answer) {
            await Friends.create({
                user1Id: req.body.userId,
                user2Id: req.body.friendId
            });
            res.status(201).json({
                msg: 'answered in request'
            });
        } else {
            res.status(201).json({
                msg: "Your answer is no"
            });
        }
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: 'Something went wrong with answering friend request'
        })
    }
};
