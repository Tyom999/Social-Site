const io = require("socket.io");
const db = require("../models");
const Users = db.users;
const Friends = db.friends;
const Chats = db.chats;
const PendingRequests = db.pendingRequests;
const {Op} = require('sequelize');


async function isFriends(data) {
    try {
        const friends = await Friends.findAll({
            where: {
                user1Id: {
                    [Op.or]: [data.user1Id, data.user2Id]
                },
                user2Id: {
                    [Op.or]: [data.user1Id, data.user2Id]
                }
            }
        });
        return friends;
    } catch (e) {
        return [];
    }
}

const socketService = {
    init(server) {
        this.io = io(server);
        this.startListening();
    },

    startListening() {
        const activeUsers = new Set();
        this.io.on("connection", socket => {
            socket.on('addFriend', async (data) => {

                const isFriend = await isFriends(data);

                let isTherePendingRequest = await PendingRequests.findAll({
                    where: {
                        user1Id: {
                            [Op.or]: [data.user1Id, data.user2Id]
                        },
                        user2Id: {
                            [Op.or]: [data.user1Id, data.user2Id]
                        },

                    }
                });
                if (isFriend.length === 0 && isTherePendingRequest.length === 0) {
                    await PendingRequests.create({
                        user1Id: data.user1Id,
                        user2Id: data.user2Id
                    });
                    socket.broadcast.emit('question', data);
                }
            });
            socket.on('sendMessage', async (data) => {
                const isFriend = await isFriends(data);
                if (isFriend.length > 0) {
                  await Chats.create({
                       message: data.message,
                       fromId: data.user1Id,
                       senderId: data.user2Id,
                   });
                socket.emit('getMsg');
                socket.broadcast.emit('getMsg');
                }
            });
            socket.on("disconnect", () => {
                activeUsers.delete(socket.userId);
                socket.emit('message', 'A user has left the chat');
            });
            socket.on("readMessage", async (data) => {
                let message = await Chats.findOne({where: {senderId: data.user2Id}});
                if (message !== null && !message.isRead) {
                    await Chats.update({isRead: true}, {
                        where: {
                            senderId: data.user2Id
                        }
                    })
                }
            });
        });
    }
}

module.exports = socketService;