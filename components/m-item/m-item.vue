<template>
	<view>
	<uni-grid :column="4" :show-border="false" :square="false">
		<uni-grid-item class="ui-gridItems" v-for="(item,index) in itemList" :key="index">
			<view class="ui-href" @click="hrefTo(item.path)">
					<image class="ui-image" :src="item.url" mode=""></image>
					<text class="ui-text">{{item.text}}</text>
				
			</view>
		</uni-grid-item>
	</uni-grid>
	</view>
</template>

<script> 
	import uniGrid from "../uni-grid/uni-grid.vue"
	import uniGridItem from '../uni-grid-item/uni-grid-item.vue'

	export default {
		components:{
			uniGrid,
			uniGridItem,
		},
		props:{
			itemList:{
				type:Array,
				default:null
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			hrefTo(data){
				console.log(data)
				uni.navigateTo({
					url:data
				});
			}
		}
	}
</script>

<style scoped>
	.ui-href{
		    display: flex;
		    flex-direction: column;
	}
	.ui-gridItems{
		margin-top: 40rpx;
	}
.ui-image{
	width: 80rpx;
	height: 80rpx;
	margin: 0 auto;
}
.ui-text{
	text-align: center;
}
</style>
