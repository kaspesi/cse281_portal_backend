const express = require('express');
const { postInvestigatorLogin } = require('../controllers/investigatorLoginController');
const { postAdminLogin } = require('../controllers/adminLoginController');

const loginRouter = express.Router();

loginRouter.post('/investigator', postInvestigatorLogin);
loginRouter.post('/admin', postAdminLogin);

module.exports = loginRouter;