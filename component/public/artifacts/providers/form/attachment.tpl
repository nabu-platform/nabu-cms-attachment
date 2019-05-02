<template id="page-form-input-attachment-configure">
	<n-form-section>
		<n-page-mapper :to="['nodeId', 'groupId']" :from="$services.page.getAvailableParameters(page, cell)"  v-model="field"/>
		<n-form-text label="Amount of attachments" v-model="field.amount"/>
		<div class="list-actions">
			<button @click="field.types.push('')">Add Allowed Type</button>
		</div>
		<n-form-section class="list-row" v-for="i in Object.keys(field.types)">
			<n-form-text v-model="field.types[i]"/>
			<button class="danger" @click="field.types.splice(i, 1)"><span class="fa fa-times"></span></button>
		</n-form-section>
	</n-form-section>
</template>