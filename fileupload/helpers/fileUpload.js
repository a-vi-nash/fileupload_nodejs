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

let memoryStorage = multer.memoryStorage;

const jsonFilter = (req, file, cb) => {
  if (file.mimetype !== "application/json") {
    req.fileValidationError = global.config.fileValidationError;
    return cb(null, false);
  } else {
    cb(null, true);
  }
};

exports.SingleFileUpload = multer({
  fileFilter: jsonFilter,
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
