const express = require('express');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +"") //Appending .jpg
    }
  })
const upload = multer({ storage: storage})
const auth = require("../middleware/auth");
const { investigateImage } = require('../controllers/investigateController');

const investigateRouter = express.Router();

investigateRouter.post('/', auth, upload.array('photos', 12,), investigateImage);

module.exports = investigateRouter;