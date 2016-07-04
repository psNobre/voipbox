"use strict";

angular.element(document).ready(function(){
	angular.bootstrap(document, ["app"]);
});

angular.module("app", ["ui.router", "googlechart"]);