module.exports = (sequelize, Sequelize) => {
    const Friend = sequelize.define("friend", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user1Id: {
            type: Sequelize.INTEGER
        },
        user2Id: {
            type: Sequelize.INTEGER
        }
    });

    return Friend;
};
