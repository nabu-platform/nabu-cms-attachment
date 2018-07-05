<template id="page-attachment-uploader">
	<div class="page-attachment-uploader">
		<n-sidebar v-if="configuring" @close="configuring = false" class="settings">
			<n-collapsible title="Attachment Settings">
				<n-form class="layout2">
					<n-form-section>
						<n-page-mapper :to="['nodeId', 'groupId']" :from="$services.page.getAvailableParameters(page, cell)"  v-model="cell.state"/>
						<n-form-text label="Amount of attachments" v-model="cell.state.amount"/>
						<n-form-text label="Success Event" v-model="cell.state.event" :timeout="600" @input="$emit('updatedEvents')"/>
						<div class="list-actions">
							<button @click="cell.state.types.push('')">Add Allowed Type</button>
						</div>
						<n-form-section class="list-row" v-for="i in Object.keys(cell.state.types)">
							<n-form-text v-model="cell.state.types[i]"/>
							<button class="danger" @click="cell.state.types.splice(i, 1)"><span class="fa fa-times"></span></button>
						</n-form-section>
					</n-form-section>	
				</n-form>
			</n-collapsible>
		</n-sidebar>
		<n-file-uploader
			@uploaded='emit'
			:amount='cell.state.amount ? parseInt(cell.state.amount) : null'
			:types='cell.state.types'
			:node-id='getField(cell.state.nodeId)'
			:group-id='getField(cell.state.groupId)'
			:disabled='disabled'/>
	</div>
</template>