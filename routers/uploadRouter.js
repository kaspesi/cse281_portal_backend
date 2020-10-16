const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'models/' })
const { postUpload } = require('../controllers/uploadController');

const uploadRouter = express.Router();
modelUpload = upload.fields([{name: 'model.json', maxCount:1}, {name:'model.weights.bin', maxCount:1}])
uploadRouter.post('/', modelUpload, postUpload);

module.exports = uploadRouter;