module.exports = (sequelize, Sequelize) => {
    PendingRequest = sequelize.define("pendingRequest", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user1Id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        user2Id: {
            type: Sequelize.INTEGER
        }
    });

    return PendingRequest;
};
