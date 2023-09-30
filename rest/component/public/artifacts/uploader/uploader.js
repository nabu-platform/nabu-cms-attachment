Vue.view("attachment-uploader", {
	props: {
		attachments: {
			type: Array,
			default: function() {
				// we insert a marker into the array so we know whether it was generated or passed in
				return ["marker"];
			}
		},
		attachmentGroup: {
			type: String
		},
		nodeId: {
			type: String,
			required: true
		},
		edit: {
			type: Boolean,
			required: false
		},
		childComponents: {
			type: Object,
			required: false
		}
	},
	data: function() {
		return {
			uploading: false,
			managed: false,
			files: []
		}
	},
	created: function() {
		if (this.attachments.length == 1 && this.attachments[0] == "marker") {
			this.attachments.splice(0);
			this.managed = true;
		}
		console.log("Attachments are " + (this.managed ? "managed" : "not managed") + " by the component");
		if (this.managed) {
			this.load();
		}
		else {
			this.enrichWithUrl();
		}
	},
	methods: {
		getChildComponents: function() {
			var childComponents = [{
				title: "Image Container",
				name: "attachment-uploader-container",
				component: "row"
			}];
			childComponents.push({
				title: "Image",
				name: "attachment-uploader-image",
				component: "image"
			});
			return childComponents;
		},
		load: function() {
			var self = this;
			this.$services.swagger.execute("nabu.cms.attachment.rest.list", {
				nodeId: this.nodeId,
				group: this.attachmentGroup
			}).then(function(result) {
				if (result.attachments) {
					nabu.utils.arrays.merge(self.attachments, result.attachments);
				}
			})
		},
		upload: function() {
			var self = this;
			this.uploading = true;
			var promises = this.files.splice(0).map(function(file) {
				return self.$services.swagger.execute("nabu.cms.attachment.rest.internal.create", { nodeId: self.nodeId, body: file, group: self.attachmentGroup }).then(function(attachment) {
					console.log("attachment is", attachment);
					if (attachment) {
						self.attachments.push(attachment);
					}
				})
			});
			this.$services.q.all(promises).then(function() {
				self.uploading = false;
			}, function() {
				self.uploading = false;
			})
		},
		enrichWithUrl: function() {
			var self = this;
			self.attachments.forEach(function(attachment) {
				if (!attachment.$url) {
					self.$services.user.downloadUrl("nabu.cms.attachment.rest.internal.get", {
						nodeId: self.nodeId,
						attachmentId: attachment.id
					}, true).then(function(url) {
						Vue.set(attachment, "$url", url);
					})
				}
			});
		},
		deleteAttachment: function(attachment) {
			var uploading = true;
			var self = this;
			this.$services.swagger.execute("nabu.cms.attachment.rest.delete", {
				nodeId: this.nodeId,
				attachmentId: attachment.id
			}).then(function() {
				self.attachments.splice(self.attachments.indexOf(attachment), 1);
				self.uploading = false;
			}, function() {
				self.uploading = false;
			})
		}
	},
	watch: {
		attachments: {
			deep: true,
			handler: function() {
				this.enrichWithUrl();
			}
		}
	}
});