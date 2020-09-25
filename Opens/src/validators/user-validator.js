/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use strict';

let errors = [];

function ValidationContract() {
    errors = [];
}

/** Required field */
ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

/** Minimum character field */
ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

/** Maximum character field */
ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

/** Fixed character size field */
ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

/** Email field */
ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

/** Return errors */
ValidationContract.prototype.errors = () => { 
    return errors; 
}

/** Clear */
ValidationContract.prototype.clear = () => {
    errors = [];
}

/** Validate */
ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;
