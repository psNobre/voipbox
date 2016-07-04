"use strict";

module.exports = {
  client: {
    lib: {
      css: [
        "public/bower_components/semantic/dist/semantic.min.css"
      ],
      js: [
        "public/bower_components/angular/angular.min.js",
        "public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "public/bower_components/jquery/dist/jquery.min.js",
        "public/bower_components/semantic/dist/semantic.min.js",
        "public/bower_components/angular-google-chart/ng-google-chart.min.js"
      ]
    },
    css: "application/*/client/**/*.css",
    js: [
      "application/*/client/**/client.*.config*(.*).js",
      "application/*/client/**/client.*.js"
    ]
  },
  server: {
    models: "application/*/server/server.*.model*(.*).js",
    routes: "application/*/server/server.*.route*(.*).js",
    services: "application/*/server/server.*.service*(.*).js",
    configs: "application/*/server/server.*.config*(.*).js",
    views: "application/*/server/views/server.*.html"
  }
};

