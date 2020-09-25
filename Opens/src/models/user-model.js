/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use stric';

/** Imports */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Entity user database */
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }

});

/** Export */
module.exports = mongoose.model('User', schema);