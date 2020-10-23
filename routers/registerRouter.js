const express = require('express');
const { postInvestigatorRegister, getInvestigatorRegister } = require('../controllers/investigatorRegisterController');
const { postAdminRegister, getAdminrRegister } = require('../controllers/adminRegisterController');

const registerRouter = express.Router();

registerRouter.get('/investigator', getInvestigatorRegister);

registerRouter.post('/investigator', postInvestigatorRegister);

registerRouter.get('/admin', getAdminrRegister);

registerRouter.post('/admin', postAdminRegister);

module.exports = registerRouter;