<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
			url:null,
			}
		},
		onLoad(option) {
			console.log(option)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
