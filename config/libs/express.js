"use strict";

var swig = require("swig");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var session = require('express-session');

module.exports.init = function init(params){

    var app = params.app;
    var config = params.config;

    // Initialize all middlewares
    initMiddlewares(app);

    // Initialize view engine
    initViewEngine(app)

    // Initialize statics folders
    initStatics(app, config);

    // Initialize locals    
    initClientLocals(app, config);

    return app;
};

function initMiddlewares(app){
    if(process.env.NODE_ENV == "development"){
        app.use(morgan("dev"));
    };
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded()); 

    app.use(session({
        // genid: function(req) {
        //     return genuuid()
        // },
        secret: 'keyboard cat'
        // resave: false,
        // saveUninitialized: true,
        // cookie: { secure: true }
    }));

};

function initViewEngine(app){
    if(process.env.NODE_ENV == "development"){
        app.set("view cache", false);
        swig.setDefaults({ cache: false });
    };
    app.set("views", "./application");
    app.set("view engine", "html");
    app.engine("html", swig.renderFile);    
};

function initStatics(app, config){
    app.use("/public", express.static("./public"));

    // setting client folders as static
    config.folders.client.forEach(function (staticPath) {
        app.use("/" + staticPath, express.static("./" + staticPath));
    });
};

function initServerFiles(files, app, config){
    files.forEach(function(file){
        var moduleExports = require(path.resolve(process.cwd(), file));
        typeof moduleExports == "function" && (moduleExports(app, config));
    });
};

function initClientLocals(app, config){
    if(process.env.NODE_ENV == "development"){
        
        // initialize all client locals files
        app.locals.jsFiles = config.files.client.js;
        app.locals.cssFiles = config.files.client.css;
    }
};

