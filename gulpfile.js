"use strict";

var config = require("./config/global");
var assets = require("./config/assets/default");

var gulp  = require("gulp");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var shell = require("gulp-shell");

// aggregate all client javascripts files
gulp.task("client:uglify", function(){
	return gulp.src(config.files.client.js)
	.pipe(concat("aggregateds/aggregated.min.js"))
	.pipe(uglify({
		mangle: false
	}))
	.pipe(gulp.dest("./public"))
});

// aggregate all client css files
gulp.task("client:cssmin", function(){
	return gulp.src(config.files.client.css)
	.pipe(cssmin())
	.pipe(concat("aggregateds/aggregated.min.css"))
	.pipe(gulp.dest("./public"))
});

// clear build files
gulp.task("clean", function(){
	return gulp.src([
		"public/bower_components",
		"public/aggregateds",
		"node_modules",
		".build"
	])
	.pipe(clean());
});

// install bower components
gulp.task("bower", shell.task([
  "cd ./public && bower install --allow-root"
]));

// build client files
gulp.task("client", ["client:uglify", "client:cssmin"]);

// default build
gulp.task("default", function(){
	gulp.start("bower");
	gulp.start("client");
});