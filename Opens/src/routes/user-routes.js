/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use stric';

/** Imports */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

/** GET all users */
router.get('/', authService.isAdmin, controller.get); // only admin

/** GET sign user */
router.get( '/sign',  controller.getSign);  //  user|admin

/** GET ID user */
router.get('/:id', authService.isAdmin, controller.getById);  // only admin

/** POST user */
router.post('/',  authService.isAdmin, controller.post); // only admin

/** PUT sign user */
router.put('/sign', authService.authorize, controller.putSign); // user|admin

/** PUT user */
router.put('/:id', authService.isAdmin, controller.put); // user|admin

/** DELETE user */
router.delete('/:id',  authService.isAdmin, controller.delete); // only admin

/** Autentication user token user */
router.post('/authenticate', controller.authenticate);

/** Export */
module.exports = router;