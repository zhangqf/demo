<template>
	<view class="content">
		<uni-card :title="item.comName" note="true" v-for="(item,index) in list" :extra="item.createtime | renderTime" :key="item.id">
			<view class="ui-item" >联系电话: <span class="ui-span">{{item.comTel}}</span></view>
			<view v-if="item.content" class="ui-item">建议内容: <span  class="ui-span">{{item.content}}</span></view>
			<view class="ui-item ui-display"  >
				<image v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<uni-tag v-if="item.state==0" text="异常" type="error" :circle="true"  size="small"></uni-tag>
					<uni-tag v-if="item.state==1" text="待受理" type="warning" :circle="true" size="small"></uni-tag>
					<uni-tag v-if="item.state==2" text="已受理" type="success" :circle="true" size="small" ></uni-tag>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '../../components/uni-card/uni-card.vue'
	export default {
		components:{uniCard},
		data() {
			return {
				list: [],
				host:null,
			};
		},
		filters:{
			 renderTime(date) {
			  var dateee = new Date(date).toJSON();
			  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
			}
		},
		onLoad: function(options) {
			console.log(options)
			let that = this
			this.host = this.$Host
			let Obj = {
				id: options.id,
				currPage: 1,
				toatlNum: 50
			};
			this.$api.getComplaintByClientId(Obj).then(res => {
				 uni.hideLoading();
				that.list = res.data
				that.list.map((item,index)=>{
					if(item.imgs){
						item['imgList'] = item.imgs.split(",")
					}
				})
			})
		}
	}
</script>

<style lang="less">
	.content{
		padding-bottom: 300rpx;
	}
	.ui-display{
		display: flex;
		image{
			width: 25%;
			padding: 0 8rpx;
			height: 155rpx;
		}
	}
	.uni-tag {
		float: right;
		width: 16%;
		text-align: right;
	}
	.ui-span{
		margin-left: 20rpx;
	}
	.ui-item{
		padding: 20rpx 0;
	}
</style>
