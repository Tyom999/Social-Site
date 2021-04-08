module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fromId: {
            type: Sequelize.INTEGER
        },
        senderId: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.STRING
        },
        isRead: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Chat;
};
