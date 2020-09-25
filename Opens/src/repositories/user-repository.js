/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use strict';

/** Imports */
const mongoose = require('mongoose');
require('../models/user-model');
const User = mongoose.model('User');

/** Get all user */
exports.get = () => {
    return User.find({});
}

/** Get ID user */
exports.getById = (id) => {
    return User.findById(id)
}

/** Get Sign user */
// exports.getBySign = (id) => {
//     return User.findById(id)
// }

/** Insert user */
exports.create = (data) => {
    var user = new User(data);
    return user.save();
}

/** Update user */
exports.update = (id, data) => {
    var user = new User(data);
    return User.findByIdAndUpdate(
        id, {
            $set: {
                name: data.name,
                password: data.password,
                email: data.email,
                role: data.role
            }
        }
    )
}

/** Delete user */
exports.delete = (id) => {
    var user = new User();
    return User.findOneAndRemove(
        id
    )
}

/** Generate the key authenticate */
exports.authenticate = async(data) => {		  
    const res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

/** Generate the key authenticate */
// exports.isAdmin = async(data) => {		  
//     const res = await User.findOne({
//         email: data.email,
//         password: data.password
//     });
//     return res;
// }


