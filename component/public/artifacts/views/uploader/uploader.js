if (!nabu) { var nabu = {} }
if (!nabu.cms) { nabu.cms = {} }
if (!nabu.cms.views) { nabu.cms.views = {} }

nabu.cms.views.AttachmentUploader = Vue.extend({
	template: "#page-attachment-uploader",
	props: {
		page: {
			type: Object,
			required: true
		},
		parameters: {
			type: Object,
			required: false
		},
		cell: {
			type: Object,
			required: true
		},
		edit: {
			type: Boolean,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		}
	},
	created: function() {
		this.normalize(this.cell.state);
	},
	data: function() {
		return {
			configuring: false
		}
	},
	methods: {
		configure: function() {
			this.configuring = true;	
		},
		normalize: function(state) {
			if (!state.nodeId) {
				Vue.set(state, "nodeId", null);
			}
			if (!state.types) {
				Vue.set(state, "types", []);
			}
			if (!state.groupId) {
				Vue.set(state, "groupId", null);
			}
			if (!state.amount) {
				Vue.set(state, "amount", 1);
			}
			if (!state.event) {
				Vue.set(state, "event", null);
			}
		},
		getEvents: function() {
			var result = {};
			if (this.cell.state.event) {
				result[this.cell.state.event] = this.$services.swagger.resolve(this.$services.swagger.definition("#/definitions/nabu.cms.attachment.types.rest.attachmentOutput"));
			}
			return result;
		},
		emit: function(attachments) {
			if (this.cell.state.event) {
				var pageInstance = this.$services.page.getPageInstance(this.page, this);
				pageInstance.emit(this.cell.state.event, this.attachments);
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
})