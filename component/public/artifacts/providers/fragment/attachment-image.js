Vue.component("page-field-fragment-attachment-image-configure", {
	template: "<n-form-section>"
		+ "		<n-form-switch v-model='fragment.nodeIdIsLocal' label='Node id is local'/>"
		+ "		<n-page-mapper v-if='!fragment.nodeIdIsLocal' :to=\"['nodeId']\" :from='availableParameters' v-model='fragment'/>"
		+ "		<n-form-combo v-else v-model='fragment.localNodeId' label='Node Id' :items='keys'/>"
		+ "		<n-form-combo v-model='fragment.attachmentId' label='Attachment Id' :items='keys'/>"
		+ "		<n-form-text v-model='fragment.height' label='Height'/>"
		+ "		<n-form-text v-model='fragment.width' label='Width'/>"
		+ "		<n-form-combo v-model='fragment.size' label='Sizing' :nillable='false' :items=\"['cover', 'contain']\"/>"
		+ "</n-form-section>",
	props: {
		cell: {
			type: Object,
			required: true
		},
		page: {
			type: Object,
			required: true
		},
		// the fragment this image is in
		fragment: {
			type: Object,
			required: true
		},
		keys: {
			type: Array,
			required: true
		}
	},
	computed: {
		availableParameters: function() {
			var available = this.$services.page.getAvailableParameters(this.page, this.cell, true);
			if (this.keys.length) {
				available.record = {properties:{}};
				this.keys.forEach(function(key) {
					available.record.properties[key] = {
						type: "string"
					}
				});
			}
			return available;
		}
	},
	created: function() {
		if (!this.fragment.nodeId) {
			Vue.set(this.fragment, "nodeId", null);
		}
		if (!this.fragment.attachmentId) {
			Vue.set(this.fragment, "attachmentId", null);
		}
		if (!this.fragment.height) {
			Vue.set(this.fragment, "height", null);
		}
		if (!this.fragment.size) {
			Vue.set(this.fragment, "size", null);
		}
	}
});

Vue.component("page-field-fragment-attachment-image", {
	template: "<div class='attachment-image' :style=\"{'background-image': 'url(' + $services.attachment.url(nodeId, attachmentId) + ')', 'height': fragment.height ? fragment.height : 'inherit', 'width': fragment.width ? fragment.width : 'inherit', 'background-size': fragment.size}\"/>",
	props: {
		cell: {
			type: Object,
			required: true
		},
		page: {
			type: Object,
			required: true
		},
		fragment: {
			type: Object,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	computed: {
		attachmentId: function() {
			if (this.data) {
				return this.$services.page.getValue(this.data, this.fragment.attachmentId);
			}
			else {
				var pageInstance = this.$services.page.getPageInstance(this.page, this);
				return this.$services.page.getBindingValue(pageInstance, this.fragment.attachmentId, this);
			}
		},
		nodeId: function() {
			if (this.fragment.nodeIdIsLocal) {
				if (this.data) {
					return this.$services.page.getValue(this.data, this.fragment.localNodeId);
				}
				else {
					var pageInstance = this.$services.page.getPageInstance(this.page, this);
					return this.$services.page.getBindingValue(pageInstance, this.fragment.localNodeId, this);
				}
			}
			else {
				return this.getField(this.fragment.nodeId);
			}
		}
	},
	methods: {
		getField: function(field) {
			if (!field) {
				return null;
			}
			// check if we have local access to the record
			if (field.indexOf("record.") == 0) {
				return this.$services.page.getValue(this.data, field.substring("record.".length));
			}
			else {
				var pageInstance = this.$services.page.getPageInstance(this.page, this);
				return this.$services.page.getBindingValue(pageInstance, field);
			}
		}
	}
});