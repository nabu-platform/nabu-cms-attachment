window.addEventListener("load", function() {
	application.bootstrap(function($services) {
		// ------------------------------- SERVICES
		return $services.$register({
			attachment: nabu.services.cms.Attachment
		});
	});
});