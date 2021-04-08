const db = require("../models");
const Users = db.users;
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.login = async (req, res) => {
    try  {
        if (!req.body.nickname && !req.body.password) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        let candidate = await  Users.findOne({where: {nickname: req.body.nickname}})
        if (candidate) {
            let password = bcryptJs.compareSync(req.body.password, candidate.password);
            if (password) {
                let token = jwt.sign({
                        id: candidate.id,
                        nickname: candidate.nickname,
                        isAdmin: candidate.admin,
                        isBlocked: candidate.isBlocked
                    },
                    keys.jwt_key,
                    {expiresIn: '30m'}
                );
                res.header('token', token);
                res.status(201).json({
                    token,
                    id: candidate.id
                });
            }
        } else {
            res.status(500).json({
                msg: 'there is not user with that nickname'
            })
        }
    } catch (e) {
        res.status(401).json({
            msg: "Login error"
        })
    }

};

exports.register = async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(req.body.password, salt);
        let newUser = {
            nickname: req.body.nickname,
            password: hashPassword
        };
        Users.create(newUser)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    }

};
