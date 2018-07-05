Vue.component("page-form-input-attachment-configure", {
	template: "#page-form-input-attachment-configure",
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
		field: {
			type: Object,
			required: true
		}
	},
	created: function() {
		if (!this.field.nodeId) {
			Vue.set(this.field, "nodeId", null);
		}
		if (!this.field.types) {
			Vue.set(this.field, "types", []);
		}
		if (!this.field.groupId) {
			Vue.set(this.field, "groupId", null);
		}
		if (!this.field.amount) {
			Vue.set(this.field, "amount", 1);
		}
		if (!this.field.event) {
			Vue.set(this.field, "event", 1);
		}
	}
});

Vue.component("page-form-input-attachment", {
	template: "<n-file-uploader"
			+ "		@uploaded='emit'"
			+ "		:amount='field.amount'"
			+ "		:label='label'"
			+ "		:types='field.types'"
			+ "		:node-id='getField(field.nodeId)'"
			+ "		:group-id='getField(field.groupId)'"
			+ "		:disabled='disabled'/>",
	props: {
		cell: {
			type: Object,
			required: true
		},
		page: {
			type: Object,
			required: true
		},
		field: {
			type: Object,
			required: true
		},
		value: {
			required: true
		},
		label: {
			type: String,
			required: false
		},
		timeout: {
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		schema: {
			type: Object,
			required: false
		}
	},
	methods: {
		emit: function(attachments) {
			if (this.field.event) {
				var pageInstance = this.$services.page.getPageInstance(this.page, this);
				pageInstance.emit(this.field.event, this.attachments);
			}
		},
		getField: function(field) {
			if (!field) {
				return null;
			}
			var pageInstance = this.$services.page.getPageInstance(this.page, this);
			return this.$services.page.getBindingValue(pageInstance, field);
		}
	}
});