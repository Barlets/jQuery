var Actors = {
	init: function( config ) {
		this.config = config;

		this.setupTemplates();
		this.bindEvents();

		$.ajaxSetup({
			url: 'index.php',
			type: 'POST',
		});
		$('button').remove();
	},

	bindEvents: function() {
		this.config.letterSelection.on( 'change', this.fetchActors );
		this.config.actorsList.on('click', 'li', this.displayAuthorInformation );
		this.config.actorInfo.on('click', 'span.close', this.closeOverlay);
	},

	setupTemplates: function() {
		this.config.actorListTemplate = Handlebars.compile( this.config.actorListTemplate);
		this.config.actorInfoTemplate = Handlebars.compile( this.config.actorInfoTemplate);

		Handlebars.registerHelper( 'fullName', function( actor ) {
			return actor.first_name + ' ' + actor.last_name;
		});
	},

	fetchActors: function() {
		var self = Actors;
		// console.log(self.config.form.serialize()); return;

		$.ajax({
			data: self.config.form.serialize(),
			dataType: 'json',
			success: function( results ) {
				// console.log(self.config.actorListTemplate( results ));
				self.config.actorsList.empty();
				if ( results[0] ) {
					self.config.actorsList.empty().append( self.config.actorListTemplate( results) );
				} else {
					self.config.actorsList.append('<li>Nothing returned</li>')
				}

			}
		})
	},

	displayAuthorInformation: function( e ) {
		var self = Actors;

		self.config.actorInfo.slideUp(300);

		$.ajax({
			data: { actor_id: $(this).data( 'actor_id' ) }
		}).done(function( results ) {
			self.config.actorInfo.html( self.config.actorInfoTemplate( {info: results}) ).slideDown(300);
		});

		e.preventDefault();

	},

	closeOverlay: function() {
		Actors.config.actorInfo.slideUp(300);
	},

};

Actors.init({
	letterSelection: $('#q'),
	form: $('#actor-selection'),
	actorListTemplate: $('#actor_list_template').html(),
	actorInfoTemplate: $('#actor_info_template').html(),
	actorsList: $('ul.actors_list'),
	actorInfo: $('div.actor_info')
});