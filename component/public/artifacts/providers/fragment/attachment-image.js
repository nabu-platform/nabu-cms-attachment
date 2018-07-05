Vue.component("page-field-fragment-attachment-image-configure", {
	template: "<n-form-section>"
		+ "		<n-page-mapper :to=\"['nodeId']\" :from='$services.page.getAvailableParameters(page, cell)'  v-model='fragment'/>"
		+ "		<n-form-combo v-model='fragment.attachmentId' label='Attachment Id' :items='keys'/>"
		+ "		<n-form-text v-model='fragment.height' label='Height'/>"
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
	template: "<div class='attachment-image' :style=\"{'background-image': 'url(' + $services.attachment.url(getField(fragment.nodeId), data[fragment.attachmentId]) + ')', 'height': fragment.height ? fragment.height : 'inherit', 'background-size': fragment.size}\"/>",
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
	methods: {
		getField: function(field) {
			if (!field) {
				return null;
			}
			var pageInstance = this.$services.page.getPageInstance(this.page, this);
			return this.$services.page.getBindingValue(pageInstance, field);
		}
	}
});