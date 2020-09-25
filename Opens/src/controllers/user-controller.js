/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use strict';

/** Imports */
const mongoose = require('mongoose');
const validationContract = require('../validators/user-validator');
const repository = require('../repositories/user-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');
const TokenStorage = require('../utils/localStorage');

/** Instantiating Local Storage */
const idStorage = new TokenStorage();

/** Get all user */
exports.get = async(req, res, next) =>{
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } 
    catch (error) {
        res.status(500).send({
            message: 'Falhar ao processar requisição!!!'
        });
    }    
};

/** Get id user */
exports.getById = async(req, res, next) =>{
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falhar ao processar requisição!!!'
        });
    }
};

/** Get user sign */
exports.getSign = async(req, res, next) =>{
    let id = idStorage.get();
    try {
        const data = await repository.getById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falhar ao processar requisição!!!'
        });
    }
};

/** Insert user */
exports.post = async(req, res, next) =>{
    
    /** Instantiating the ValidationContract class */
    let contract = new validationContract();

    /** Validating name */
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter no mínimo 3 caracteres!!!');
    /** Required field */
    contract.isRequired(req.body.name, 'Este campo é obrigatório!!!');

    /** Validating email */
    contract.isEmail(req.body.email, 'Este e-mail não é valido!!!');
    /** Required field */
    contract.isRequired(req.body.email, 'Este campo é obrigatório!!!');

    /** Validating login */
    contract.hasMinLen(req.body.login, 6, 'O login deve ter no mínimo 6 caracteres!!!');
    /** Required field */
    contract.isRequired(req.body.login, 'Este campo é obrigatório!!!');

    /** Validating password */
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter no mínimo 6 caracteres!!!');
    /** Required field */
    contract.isRequired(req.body.password, 'Este campo é obrigatório!!!');

    /** Validating role */
    contract.hasMinLen(req.body.role, 3, 'A role deve ter no mínimo 3 caracteres!!!');
    /** Required field */
    contract.isRequired(req.body.role, 'Este campo é obrigatório!!!');

    /** Validating name */
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    /** Save User */
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            login: req.body.login,
            password: md5(req.body.password + global.SALT_KEY) ,
            role: req.body.role,
        });
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!!!'
        });

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastrar usuário: ' + error
        });
    }    
    
};

/** Update user */
exports.put = async(req, res, next) =>{
    try {
        await repository.update(
            req.params.id, 
            {
                name: req.body.name,
                email: req.body.email,
                login: req.body.login,
                password: md5(req.body.password + global.SALT_KEY), 
                role: req.body.role,
            }
        );
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!!!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao atualizar o usuário!!!'
        });
    }
};

/** Update Sign user */
exports.putSign = async(req, res, next) =>{
    try {
        await repository.update(
            idStorage.get(), 
            {
                name: req.body.name,
                email: req.body.email,
                login: req.body.login,
                password: md5(req.body.password + global.SALT_KEY), 
                role: req.body.role,
            }
        );
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!!!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao atualizar o usuário!!!'
        });
    }
};

/** Delete user */
exports.delete = async(req, res, next) =>{
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Usuário removido com sucesso!!!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao remover usuário!!!', data: e  
        });
    } 
};

/** Authentication */
exports.authenticate = async(req, res, next) =>{

    /** Generate token */
    try {

        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) 
        });
        
        /** Setting id at the Local Storage */
        idStorage.store(user.id);
        
        /** Return mensage user not found */
        if(!user){
            res.status(404).send({message: "Usuário ou senha invalidos!!!"});
            return;
        }
        /** Generate token */
        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        })

        /** Return token, email, name and roles at the body*/
        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                role: user.role
            },
        });
    /** Return error mensage not autentication */
    } catch (error) {
        res.status(500).send({
            message: 'Falha na autenticação!!!'
        });
    }    
};