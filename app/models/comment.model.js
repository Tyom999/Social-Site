module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type: Sequelize.STRING
        },
        nickname: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        }
    });

    return Comment;
};