const express = require('express');
const multer  = require('multer')
// const upload = multer({ dest: 'models/' })
const auth = require("../middleware/auth");
const { postUrl } = require('../controllers/configController');
const { postMap } = require('../controllers/mappingController');

const configRouter = express.Router();
// configRouter.post('/url', auth, postUrl);
configRouter.post('/url', postUrl);
configRouter.post('/mapping', postMap);

module.exports = configRouter;