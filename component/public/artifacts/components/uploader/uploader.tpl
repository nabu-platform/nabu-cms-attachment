<template id="n-file-uploader">
	<div class="n-file-uploader">
		<n-input-file v-model="files" :amount="maxAmount" :types="types"/>
		<div v-if="!immediate" class="file-actions">
			<button v-if="!immediate" class="primary" @click="upload">%{file:Upload}</button>
		</div>
	</div>
</template>