module.exports = (sequelize, Sequelize) => {
    const Reply = sequelize.define("reply", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        commentId: {
            type: Sequelize.STRING
        },
        nickname: {
            type: Sequelize.STRING
        },
        reply: {
            type: Sequelize.STRING
        }
    });

    return Reply;
};