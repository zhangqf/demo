<template>
	<view class="content">
		
		<view v-for="(item,index) in list.data" :key="index">
			<uni-card :title="item.advername" thumbnail="">
				<view v-html="item.content">
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:null,
			}
		},
		async onLoad() {
			let obj = {
				currPage:1,
				toatlNum:50,
			}
			this.list = await this.$api.getNoticeList(obj)
			 uni.hideLoading();
			// this.list = data.data;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
