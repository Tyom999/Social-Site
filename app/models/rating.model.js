module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        chatId: {
            type: Sequelize.INTEGER
        },
        rate: {
            type: Sequelize.INTEGER
        }
    });

    return Rating;
};
