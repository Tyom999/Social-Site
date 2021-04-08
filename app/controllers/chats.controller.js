const db = require("../models");
const Chats = db.chats;
const Ratings = db.ratings;
const {Op} = require("sequelize");

exports.getAll = async (req, res) => {
    try {
        setTimeout(async  () => {
            let messages = await Chats.findAll({
                where: {
                    fromId: {
                        [Op.or]: [req.body.fromId, req.body.senderId]
                    },
                    senderId: {
                        [Op.or]: [req.body.fromId, req.body.senderId]
                    },

                },
                order: [
                    ['updatedAt', 'ASC']
                ],
            });
            res.status(201).json({
                userMessages: messages
            })
        }, 100)
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: "Something went wrong with getting messages"
        });
    }
}

exports.getRatingById = async (req, res) => {
    Ratings.findOne({
        where: {
            chatId: req.params.id
        }
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
}

exports.setRate = async (req, res) => {
    try {
        const rate = await  Ratings.findOne({
            where: {
                chatId: req.body.chatId
            }
        });
        if (rate !== null) {
            await Ratings.update({rate: req.body.rate}, {
                where: {
                    chatId: req.body.chatId
                }
            });
        } else {
            await Ratings.create({
                chatId: req.body.chatId,
                rate: req.body.rate
            });
        }
        res.status(201).json({
           rate: req.body
        });
    } catch (e) {
        res.status(500).json({
            err: e,
            msg: 'Something went wrong with updating rate'
        })
    }
}