const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'models/' })
const { investigateImage } = require('../controllers/investigateController');

const investigateRouter = express.Router();

investigateRouter.post('/', investigateImage);

module.exports = investigateRouter;