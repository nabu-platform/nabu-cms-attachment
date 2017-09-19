Vue.component("n-file-uploader", {
	template: "#n-file-uploader",
	props: {
		nodeId: {
			type: String,
			required: true
		},
		groupId: {
			type: String,
			required: false
		},
		amount: {
			type: Number,
			required: false
		},
		currentAmount: {
			type: Number,
			required: false
		},
		types: {
			type: Array,
			required: false
		},
		immediate: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	created: function() {
		if (this.amount) {
			this.maxAmount = amount;
		}
		else if (this.currentAmount) {
			this.maxAmount = this.$services.attachment.maxAmount - this.currentAmount;
		}
		else {
			this.maxAmount = this.$services.attachment.maxAmount;
		}
	},
	data: function() {
		return {
			maxAmount: null,
			files: [],
			working: false
		};
	},
	methods: {
		upload: function() {
			var self = this;
			this.working = true;
			return this.$services.attachment.create(this.nodeId, this.files, this.groupId).then(function(attachments) {
				self.working = false;
				this.$emit("uploaded", attachments);
			}, function() {
				self.working = false;
			});
		}	
	},
	watch: {
		files: function(newValue) {
			console.log("files are", newValue);
			if (this.immediate) {
				this.upload();
			}
		}
	}
})