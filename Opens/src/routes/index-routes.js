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

/** Route */
/**  
 * GET Index
 */
router.get('/', (req, res, next) =>{
    res.status(200).send({
        title: "API Node User - Opens",
        version: '0.0.1'
    });
});

module.exports = router;