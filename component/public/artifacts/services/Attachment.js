nabu.services.VueService(Vue.extend({
	computed: {
		maxAmount: function() {
			var configured = ${when(application.configuration("nabu.cms.attachment.configuration")/maxAmountOfAttachments == null, 20, application.configuration("nabu.cms.attachment.configuration")/maxAmountOfAttachments)};
			return configured;
		}	
	},
	methods: {
		// only for internal
		create: function(nodeId, files, groupId, title, description, languageId, meta, priority, remove) {
			var self = this;
			var promises = [];
			for (var i = 0; i < Math.min(files.length, this.maxAmount); i++) {
				promises.push(this.$services.swagger.execute("nabu.cms.attachment.rest.internal.create", {
					nodeId: nodeId,
					body: files[i],
					groupId: groupId ? groupId : null,
					title: title ? title : null,
					description : description ? description : null,
					languageId: languageId ? languageId : null,
					meta: meta ? meta : null,
					priority: priority ? priority : null,
					delete: remove ? remove : null
				}));
			}
			return this.$services.q.all(promises);
		},
		url: function(nodeId, attachmentId, thumbnail, as, secret) {
			var parameters = this.$services.swagger.parameters("nabu.cms.attachment.rest.internal.get", {
				nodeId: nodeId,
				attachmentId: attachmentId,
				thumbnail: thumbnail ? thumbnail : null,
				as: as,
				code: secret
			});
			var url = parameters.url;
			if (${environment("mobile") == true}) {
				url = "${environment('url')}" + url;
			}
			return url;
		},
		download: function(nodeId, attachmentId, thumbnail) {
			// if we are using bearer tokens, we presumably have a stateless connection
			// downloads at that point are anonymous though as we don't get the "automatic" authentication from cookies
			// to solve that, we use one time use tokens
			if (this.$services.swagger.bearer) {
				this.$services.swagger.execute("nabu.cms.core.rest.user.temporaryAuthentication").then(function(x) {
					window.location = this.url(nodeId, attachmentId, thumbnail, x ? x.id : null, x ? x.secret : null);
				});
			}
			else {
				window.location = this.url(nodeId, attachmentId, thumbnail);
			}
		},
		// only for external
		// TODO: "register" a remote url
		// for internal and external
		update: function(nodeId, attachments) {
			return this.$services.swagger.execute("nabu.cms.attachment.rest.updateAll", {
				nodeId: nodeId,
				body: {
					attachments: attachments
				}
			});
		},
		delete: function(nodeId, attachmentId) {
			return this.$services.swagger.execute("nabu.cms.attachment.rest.delete", {
				nodeId: nodeId,
				attachmentId: attachmentId
			});
		},
		list: function(nodeId) {
			return this.$services.swagger.execute("nabu.cms.attachment.rest.list", {
				nodeId: nodeId
			});
		}
	}
}), { name: "nabu.services.cms.Attachment", lazy: true });