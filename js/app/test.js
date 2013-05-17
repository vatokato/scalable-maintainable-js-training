define(["jquery", "underscore"], function ($, _) {
	var tpl= _.template("hello: <%= name %>");
	return {		
		test : function(){
			console.log( tpl({name : 'moe'}) );
		}
	}
});