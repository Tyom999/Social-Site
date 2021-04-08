module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nickname: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isBlocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        token: {
            type: Sequelize.STRING
        }
    });

    return User;
};
