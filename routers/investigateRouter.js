const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'images/' })
const { investigateImage } = require('../controllers/investigateController');

const investigateRouter = express.Router();

investigateRouter.post('/', upload.array('photos', 12), investigateImage);

module.exports = investigateRouter;