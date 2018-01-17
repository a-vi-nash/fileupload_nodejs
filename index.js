/* jshint node: true */
/* jshint esnext: true */
'use strict';
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    httpServer = require("http").createServer(app),
    path = require('path'),
    swaggerJSDoc = require('swagger-jsdoc')
    //swaggerUi = require('swagger-ui-express'),
    //swaggerDocument = require('./swagger.json')
    ;


/**
* Globally define the application config variables
**/
global.config = require('./fileupload/config/');


/**
* Allow headers for cross domain.
**/
app.use((req, res, next) => {
    const allowOrigin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", allowOrigin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    next();
});




/**
* Initialize post data parsing.
**/
app.use(bodyParser.json());



/**
* Initialize the router.
**/

app.use(require('./fileupload/controllers/'));

/**
* load ui.
**/
app.use('/page', express.static(path.join(__dirname, 'ui')))


/**
* swagger ui.
**/
//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// swagger definition
const swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.1',
      description: 'FileUpload RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

/**
* Server start port.
**/
httpServer.listen(global.config.appPort, () => {
    console.log(`server started at port ${global.config.appPort}`);
});
