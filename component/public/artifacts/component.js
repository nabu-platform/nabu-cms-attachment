window.addEventListener("load", function() {
	application.bootstrap(function($services) {
		// ------------------------------- SERVICES
		$services.$register({
			attachment: nabu.services.cms.Attachment
		});
	});
});