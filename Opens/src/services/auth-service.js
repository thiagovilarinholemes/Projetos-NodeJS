/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use strict';

/** Import */
const jwt = require('jsonwebtoken');

/** Generate token */
exports.generateToken = async (data) => {

    /** Return token  - 1d valid for 1 day*/
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

/** Token decoding */
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

/** Checks if you have permission, acts as an interceptor */
exports.authorize = function (req, res, next) {
    /** Places to look for the token */
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    /** If you do not find the token, either for a specified time and have already expired or invalid  */
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito!!!'
        });
    } 
    /** If found the token, check if the token is valid  */
    else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido!!!'
                });
            } else {
                next();
            }
        });
    }
};

/** Checks if you have permission admin */
exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito!!!'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido!!!'
                });
            } else {
                if (decoded.role == 'admin') {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores!!!'
                    });
                }
            }
        });
    }
};