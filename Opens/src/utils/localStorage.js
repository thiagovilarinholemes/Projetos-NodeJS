/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use strict'; 

/** Import */
const LocalStorage = require('node-localstorage').LocalStorage; 

function TokenStorage(){ 
    this.localStorage; 
    if (typeof localStorage === "undefined" || localStorage === null) { 
        this.localStorage = new LocalStorage('./scratch'); 
    } 
} 

/** Insert Local Storage */
TokenStorage.prototype.store = function(token){ 
    this.localStorage.setItem('token', token);  
} 

/** Get Local Storage */
TokenStorage.prototype.get = function(){ 
    return this.localStorage.getItem('token'); 
} 

/** Remove Local Storage */
TokenStorage.prototype.remove = function(){ 
    return this.localStorage.removeItem('token'); 
} 

module.exports = TokenStorage; 