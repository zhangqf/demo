<template>
	<view class="content">
		<view class="ui-noData" v-if="orderList.length==0">无已接工单</view>
		<view v-else class="ui-swiperContent">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						 :duration="duration">
							<swiper-item style="overflow-y: scroll;">
								<view class="swiper-item uni-bg-red">
									<uni-card @click="hrefTo(item.id)" title="已接工单" note="true" v-for="(item,index) in orderList " :extra="item.createtime | renderTime" :key="item.id">
										<view class="ui-item" >业主名称: <span class="ui-span">{{item.userName}}</span></view>
										<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
										<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
										<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
										<view v-if="item.content" class="ui-item">报修描述: <span  class="ui-span">{{item.content}}</span></view>
										<view class="ui-item ui-display"  >
											<image v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill"></image>
										</view>
										<template v-slot:footer>
											<view class="footer-box">
												<uni-tag class="ui-tagfontSize" v-if="item.state==1" text="接单" type="primary" :circle="true"   @click="getOrder(item.id)"></uni-tag>
												<uni-tag class="ui-tagfontSize" v-if="item.state==2" text="处理工单" type="error" :circle="true" ></uni-tag>
												<uni-tag class="ui-tagfontSize" v-if="item.state==3" text="待评价" type="warning" :circle="true"  ></uni-tag>
												<uni-tag class="ui-tagfontSize" v-if="item.state==4" text="已完成" type="success" :circle="true" ></uni-tag>
											</view>
										</template>
									</uni-card>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:null,
			};
		},
		onLoad(){
			this.getList()
		},
		filters:{
			 renderTime(date) {
			  var dateee = new Date(date).toJSON();
			  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
			}
		},
		onShow() {
			this.getList()
		},
		methods:{
			getList(){
				let obj = {
					currPage:1,
					toatlNum:50,
					id:uni.getStorageSync("wordId"),
					state:2
					};
				this.$api.getOrderListByMaint(obj).then(res=>{
					 uni.hideLoading();
					this.orderList =res.data
				})
			},
			hrefTo(data){
				uni.navigateTo({
					url:`../orderReceivedDetail/orderReceivedDetail?id=${data}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.footer-box{
		.ui-tagfontSize{
			
			font-size: 24px;
		}
	}
	.ui-noData{
		margin-top:50rpx;
		margin-left:20rpx;
		font-size: 26px;
		color: #333;
	}
.content{
		display: flex;
		.ui-swiperContent{
			flex:1;
			overflow: scroll;
			.uni-padding-wrap,.page-section,.page-section-spacing,.swiper{
				height: 100%;
				overflow: scroll;
				.ui-display{
					display: flex;
					image{
						width: 25%;
						padding: 0 8rpx;
						height: 155rpx;
					}
				}
				.uni-tag {
					height: 50rpx;
					width: 90%;
					text-align: center;
				}
				.ui-span{
					margin-left: 20rpx;
				}
				.ui-item{
					padding: 10rpx 0;
				}
			}
		}
	}
	.swiper-item{
		overflow-y: scroll;
	}
	.ui-lineBtn {
		display: flex;
		justify-content: space-around;
	}

	.ui-mItem {
		background: #fff;
		padding-bottom: 40rpx;
	}

	.main-Gallery {
		height: 400rpx;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
	
</style>
