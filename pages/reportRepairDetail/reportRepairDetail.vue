<template>
	<view>
		详情
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			console.log(options)
			let Obj = {
				id:options.id
			};
			this.$api.getOrderById(Obj).then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style lang="less">

</style>
