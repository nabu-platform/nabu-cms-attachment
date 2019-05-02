window.addEventListener("load", function() {
	application.bootstrap(function($services) {
		// page providers
		if (nabu && nabu.page && nabu.page.provide) {
			nabu.page.provide("page-field-fragment", { 
				component: "page-field-fragment-attachment-image", 
				configure: "page-field-fragment-attachment-image-configure", 
				name: "attachment-image",
				namespace: "nabu.page"
			});
			
			/* deprecated for now as it works but does not play well with other form components
			nabu.page.provide("page-form-input", { 
				component: "page-form-input-attachment", 
				configure: "page-form-input-attachment-configure", 
				name: "attachment",
				namespace: "nabu.page"
			});
			*/
			
			$services.router.register({
				alias: "page-attachment-uploader",
				enter: function(parameters) {
					return new nabu.cms.views.AttachmentUploader({propsData: parameters});
				}
			});
			
			$services.router.register({
				alias: "page-attachment-viewer",
				enter: function(parameters) {
					return new nabu.cms.views.AttachmentViewer({propsData: parameters});
				},
				query: ["nodeId", "attachmentGroupId", "attachmentId", "height", "width", "size", "randomize", "placeholder"]
			});
		}
		
		// ------------------------------- SERVICES
		return $services.$register({
			attachment: nabu.services.cms.Attachment
		});
	});
	
});

