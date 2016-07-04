"use strict";

var util = require("util");
var globby = require("globby");
var path = require("path");
var _ = require("lodash");

var validateEnvironmentVariable = function () {
	var environmentFiles = globby.sync("./config/env/" + process.env.NODE_ENV + ".js");
	if (!environmentFiles.length) {
		if (process.env.NODE_ENV) {
			console.error("+ Error: No configuration file found for '" + process.env.NODE_ENV + "' environment using development instead");
		} else {
			console.error("+ Error: NODE_ENV is not defined! Using default development environment");
		}
		process.env.NODE_ENV = "development";
	}
};

var initGlobalConfigFolders = function (config, assets) {
  // Appending files
  config.folders = {
    server: {},
    client: {}
  };

  // Setting globbed client paths
  config.folders.client = globby.sync(path.join(process.cwd(), "application/*/client/")).map(function(file){
  	return path.relative(process.cwd(), file).replace(new RegExp(/\\/g), "/");
  });

};

var initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.files = {
    server: {},
    client: {}
  };

  // Setting Globbed model files
  config.files.server.models = globby.sync(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = globby.sync(assets.server.routes);

  // Setting Globbed services files
  config.files.server.services = globby.sync(assets.server.services);

  // Setting Globbed configs files
  config.files.server.configs = globby.sync(assets.server.configs);

  // Setting Globbed js files
  config.files.client.js = globby.sync(assets.client.lib.js, "public/").concat(globby.sync(assets.client.js, ["public/"]));

  // Setting Globbed css files
  config.files.client.css = globby.sync(assets.client.lib.css, "public/").concat(globby.sync(assets.client.css, ["public/"]));
};

function initGlobalConfig(){
	// Validate NDOE_ENV existance
	validateEnvironmentVariable();

	// Get the default assets
	var defaultAssets = require(path.join(process.cwd(), "config/assets/default"));

	// Get the current assets
	var environmentAssets = require(path.join(process.cwd(), "config/assets/", process.env.NODE_ENV)) || {};

	// Merge assets
	var assets = _.merge(defaultAssets, environmentAssets);

	// Get the default config
	var defaultConfig = require(path.join(process.cwd(), "config/env/default"));

	// Get the current config
	var environmentConfig = require(path.join(process.cwd(), "config/env/", process.env.NODE_ENV)) || {};

	// Merge env config files
	var config = _.merge(defaultConfig, environmentConfig);

	// setting global folders files
	initGlobalConfigFolders(config, assets);

	// setting global config files
	initGlobalConfigFiles(config, assets);

	return config;
};

module.exports = initGlobalConfig();
