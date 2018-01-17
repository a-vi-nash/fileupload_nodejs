const multer = require("multer"),
      path = require('path');


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //defines the destination folder-where the file will get saved.
    cb(null, global.config.uploadFolder)
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_"+file.originalname);
  }
});

exports.SingleFileUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
