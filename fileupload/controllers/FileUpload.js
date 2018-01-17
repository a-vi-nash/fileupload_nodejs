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

router.post("/multiple", fileUpload.array("file"), (req, res) => {
  let fileArray = req.files;
  
  let updates = [];
  
  fileArray.forEach((item) =>{
  const updatePromise = {filename:item.originalname,storedfilename:item.filename,destination:item.destination}
  updates.push(updatePromise);   
  });
 Promise.all(updates).then(data => {
  if (data.length != fileArray.length) {
    return res
      .status(404)
      .json({
        responseCode: 404,
        responseDesc: global.config.default_not_found_message,
        'data':data
      })
      .send();
  }
  return res
    .status(200)
    .json({
      responseCode: 200,
      responseDesc: global.config.default_success_message,
      'data':data,
      'filecount':fileArray.length,
      'uploadcount':data.length
    })
    .send();
})
.catch(error => {
  throw error;
});
});

  module.exports = router;