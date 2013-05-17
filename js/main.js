requirejs.config({
	"baseUrl" : "js/lib",
	"paths" : {
		"app" : "../app/app",
		"test" : "../app/test",
		"jquery" : "jquery",
		"underscore" : "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.2.1/underscore-min"
	}
});

require(["jquery", "underscore", "app", "test"], function($, _ , APP, t) {
	//t.test();
	APP.init();
});