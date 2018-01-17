/* jshint node: true */
/* jshint esnext: true */
'use strict';
const express = require('express'),
    router = express.Router();


router.use('/fileupload', require('./FileUpload'));

module.exports = router;
