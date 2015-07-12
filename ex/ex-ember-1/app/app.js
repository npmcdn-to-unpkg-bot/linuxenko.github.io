(function() {
	'use strict';

	window.EXEone = Em.Application.create();
	EXEone.$.extend(EXEone, {
		version : '0.0.1a'
	});


	EXEone.Router.map(function() {
		this.resource('home', { path : '/' });
		this.resource('controllers');
		this.resource('models');
	});










	EXEone.FooterView = Em.View.create({
		templateName : '_footer',
		curTime : new Date().toISOString().slice(0, 19),
		version : EXEone.version
	});

})();