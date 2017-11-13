<template id="n-file-uploader">
	<div class="n-file-uploader">
		<span class="n-icon n-icon-loader" v-if="working"></span>
		<n-input-file v-if="!working" v-model="files" :amount="maxAmount" :types="types" @change="changed"/>
		<div v-if="!immediate" class="file-actions">
			<button :disabled="working" v-if="!immediate" class="primary" @click="upload">%{file:Upload}</button>
		</div>
	</div>
</template>