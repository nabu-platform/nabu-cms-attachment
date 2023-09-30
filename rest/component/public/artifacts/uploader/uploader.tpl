<template id="attachment-uploader">
	<div class="attachment-uploader is-row" :class="getChildComponentClasses('attachment-uploader-container')">
		<div v-for="attachment in attachments" class="is-column has-button-close">
			<img class="is-image" :class="getChildComponentClasses('attachment-uploader-image')" v-if="attachment.$url" :src="attachment.$url"/>
			<img class="is-image" :class="getChildComponentClasses('attachment-uploader-image')" v-else :src="$window.application.configuration.root + 'resources/modules/image/placeholder.svg'"/>
			<button v-if="edit" class="is-button is-variant-close is-color-danger" @click="deleteAttachment(attachment)"><icon name="times"/></button>
		</div>
		<n-input-file v-if="edit" v-model="files" @change="upload" :disabled="uploading"/>
	</div>
</template>