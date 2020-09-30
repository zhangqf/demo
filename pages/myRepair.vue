<template>
	<view class="content">
		<!-- 自定义底部按钮 -->
		<uni-card @click="herfTo(item.id)" :title="item.userName" note="true" v-for="(item,index) in list" :extra="item.createtime | renderTime" :key="item.id">
			<view class="ui-item" >联系电话: <span class="ui-span">{{item.userTel}}</span></view>
			<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
			<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
			<view v-if="item.content" class="ui-item">报修描述: <span  class="ui-span">{{item.content}}</span></view>
			<view class="ui-item ui-display"  >
				<image v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<uni-tag v-if="item.state==1" text="已发布" type="primary" :circle="true"  size="small"></uni-tag>
					<uni-tag v-if="item.state==2" text="已接单" type="error" :circle="true" size="small"></uni-tag>
					<uni-tag v-if="item.state==3" text="待评价" type="warning" :circle="true" size="small" ></uni-tag>
					<uni-tag v-if="item.state==4" text="已完成" type="success" :circle="true" size="small"></uni-tag>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	
	import uniTag from "../../components/uni-tag/uni-tag.vue"
	import uniCard from '../../components/uni-card/uni-card.vue'
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniCard,
			uniList,
			uniListItem,
			uniTag
		},
		filters:{
			 renderTime(date) {
			  var dateee = new Date(date).toJSON();
			  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
			}
		},
		data() {
			return {
				list: [],
				host:null,
			};
		},
		methods:{
			herfTo(data){
				console.log(data)
				uni.navigateTo({
					url:`../reportRepairDetail/reportRepairDetail?id=${data}`
				})
			}
		},
		onLoad: function(options) {
			this.host = this.$Host
			let that = this
			let Obj = {
				id: options.id,
				currPage: 1,
				toatlNum: 50
			}
			this.$api.getOrderByClientId(Obj).then(res => {
				console.log(res)
				that.list = res.data
				that.list.map((item,index)=>{
					if(item.repimgs){
						item['imgList'] = item.repimgs.split(",")
					}
				})
				console.log(that.list)
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
