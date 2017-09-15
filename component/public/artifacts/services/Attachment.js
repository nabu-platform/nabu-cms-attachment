nabu.services.VueService(Vue.extend({
	computed: {
		maxAmount: function() {
			var configured = ${application.configuration("nabu.cms.attachment.configuration")/configuration/maxAmountOfAttachments};
			if (!configured) {
				configured = 20;
			}
			return configured;
		}	
	},
	methods: {
		// only for internal
		create: function(nodeId, files, groupId, title, description, languageId, meta, priority) {
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
					priority: priority ? priority : null 
				}));
			}
			return this.$services.q.all(promises);
		},
		url: function(nodeId, attachmentId, thumbnail) {
			return this.$services.swagger.parameters("nabu.cms.attachment.rest.internal.get", {
				nodeId: nodeId,
				attachmentId: attachmentId,
				thumbnail: thumbnail ? thumbnail : null
			}).url;
		},
		// only for external
		// TODO: "register" a remote url
		// for internal and external
		update: function(nodeId, attachments) {
			return this.$services.swagger.execute("nabu.cms.attachment.rest.internal.updateAll", {
				nodeId: nodeId,
				body: {
					attachments: attachments
				}
			});
		},
		delete: function(nodeId, attachmentId) {
			return this.$services.swagger.execute("nabu.cms.attachment.rest.internal.delete", {
				nodeId: nodeId,
				attachmentId: attachmentId
			});
		},
		list: function(nodeId) {
			return this.$services.swagger.execute("nabu.cms.attachment.rest.internal.list", {
				nodeId: nodeId,
				attachmentId: attachmentId
			});
		}
	}
}), { name: "nabu.services.cms.Attachment", lazy: true });