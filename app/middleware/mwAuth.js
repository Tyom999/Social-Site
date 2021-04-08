//todo
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const db = require("../models");
const Users = db.users;
module.exports =  async (req, res, next) => {

    try {
        const token = req.headers['token'];
        const decodedToken = jwt.verify(token, keys.jwt_key);
        const userId = decodedToken.id;
        const admin = decodedToken.isAdmin;
        let isBlocked = await Users.findOne({where: {id: userId}});
        if (isBlocked.isBlocked) {
            res.status(403).json({
                msg: 'Blocked user'
            });
        }
        if(admin) {
            next();
        } else if (req.body.userId && req.body.userId !== userId) {
            res.status(403).json({
                msg: 'Invalid user ID'
            })
        }else {
            next();
        }
    } catch {
        res.status(401).json({
            msg: 'Invalid request!',
        });
    }
};
