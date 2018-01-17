"use strict";
const express = require("express"),
  router = express.Router(),
  fileUpload = require("../helpers/fileUpload").SingleFileUpload;

//fileupload route
router.post("/", fileUpload.single("file"), (req, res) => {
  let actualfile = req.file;
  
      return res
        .status(200)
        .json({
          message:actualfile.originalname+" Uploaded"
        })
        .send();
});

  module.exports = router;