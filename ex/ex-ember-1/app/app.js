(function() {
	'use strict';

	window.EXEone = Em.Application.create();
	EXEone.$.extend(EXEone, {
		version : '0.0.1a'
	});


	EXEone.Router.map(function() {
		this.resource('home', { path : '/' });
		this.resource('post', {path: 'post/:id'})
		this.resource('posts');
		this.resource('models');
	});



	EXEone.PostsController = Em.Controller.extend({
		actions : {

		}
	});


	EXEone.PostsRoute = Em.Route.extend({
		model : function() {
			return Em.$.ajax({
				method: 'GET',
				url: 'http://jsonplaceholder.typicode.com/posts',
				dataType: 'jsonp'
			}).then(function(data) {
				// data. 
				return data;
			});
		}
	});


	EXEone.FooterView = Em.View.create({
		templateName : '_footer',
		curTime : new Date().toISOString().slice(0, 19),
		version : EXEone.version
	});

})();