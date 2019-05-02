<template id="page-attachment-viewer">
	<div class="page-attachment-viewer">
		<n-sidebar @close="configuring = false" v-if="configuring" class="settings">
			<n-form class="layout2">
				<n-collapsible title="Refresh">
					<div class="list-actions">
						<button @click="cell.state.refreshOn.push(null)">Add Refresh Listener</button>
					</div>
					<div v-for="i in Object.keys(cell.state.refreshOn)" class="list-row">
						<n-form-combo v-model="cell.state.refreshOn[i]"
							:filter="getRefreshEvents"/>
						<button @click="cell.state.refreshOn.splice(i, 1)"><span class="fa fa-trash"></span></button>
					</div>
				</n-collapsible>
			</n-form>
		</n-sidebar>
		<div class='attachment-image' v-if="resolvedAttachmentId || placeholder"
			:style="{'background-image': 'url(' + (resolvedAttachmentId ? $services.attachment.url(nodeId, resolvedAttachmentId) : '${server.root()}' + placeholder) + ')', 'height': height ? height : 'inherit', 'width': width ? width : 'inherit', 'background-size': size}"/>
	</div>
</template>