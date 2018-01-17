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

const svgpngFilter = (req, file, cb) => {
  if (file.mimetype !== "image/svg+xml" && file.mimetype !== "image/png") {
    return cb(null, false);
  } else {
    cb(null, true);
  }
};

exports.SingleFileUpload = multer({
  fileFilter: svgpngFilter,
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
