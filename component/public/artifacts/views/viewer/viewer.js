if (!nabu) { var nabu = {} }
if (!nabu.cms) { nabu.cms = {} }
if (!nabu.cms.views) { nabu.cms.views = {} }

nabu.cms.views.AttachmentViewer = Vue.extend({
	template: "#page-attachment-viewer",
	props: {
		cell: {
			type: Object,
			required: true
		},
		page: {
			type: Object,
			required: true
		},
		nodeId: {
			type: String,
			required: true
		},
		attachmentGroupId: {
			type: String,
			required: false
		},
		attachmentId: {
			required: false
		},
		height: {
			type: String,
			required: false
		},
		width: {
			type: String,
			required: false
		},
		size: {
			type: String,
			required: false,
			// or contain
			default: "cover"
		},
		randomize: {
			type: Boolean,
			required: false,
			default: false
		},
		placeholder: {
			type: String,
			required: false
		}
	},
	data: function() {
		return {
			resolvedAttachmentId: null,
			configuring: false,
			subscriptions: []
		}
	},
	created: function() {
		// if we have a placeholder, show that immediately while we lazily resolve the actual image
		if (this.placeholder) {
			this.load(function() {});
		}	
	},
	activate: function(done) {
		if (this.cell.state.refreshOn) {
			var self = this;
			var pageInstance = self.$services.page.getPageInstance(self.page, self);
			this.cell.state.refreshOn.map(function(x) {
				self.subscriptions.push(pageInstance.subscribe(x, function() {
					self.load(function() {});
				}));
			});
		}
		// if there is no placeholder, hold loading of the component until we have the actual image
		if (!this.placeholder) {
			this.load(done);
		}
		else {
			done();
		}
	},
	beforeDestroy: function() {
		this.subscriptions.map(function(x) {
			x();
		});
	},
	methods: {
		configure: function() {
			if (!this.cell.state.refreshOn) {
				Vue.set(this.cell.state, "refreshOn", []);
			}
			this.configuring = true;	
		},
		getRefreshEvents: function(value) {
			return this.$services.page.getPageInstance(this.page, this).getAvailableEvents();
		},
		load: function(done) {
			if (!this.attachmentId && this.attachmentGroupId) {
				var self = this;
				this.$services.swagger.execute("nabu.cms.attachment.rest.list", { nodeId: this.nodeId, limit: this.randomize ? null : 1, groupId: this.attachmentGroupId, orderBy: ["priority desc"] }).then(function(list) {
					if (list.attachments && list.attachments.length) {
						self.resolvedAttachmentId = list.attachments[Math.floor(Math.random() * list.attachments.length)].id;
					}
					done();
				}, done);
			}
			else if (this.attachmentId instanceof Array) {
				this.resolvedAttachmentId = this.attachmentId[Math.floor(Math.random() * this.attachmentId.length)];
				done();
			}
			else if (this.attachmentId) {
				this.resolvedAttachmentId = this.attachmentId;
				done();
			}
			else {
				done();
			}
		}
	}
});