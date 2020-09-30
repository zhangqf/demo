<template>
	<view class="content">
		<view class="ui-noData" v-if="list.length==0">暂无维修后工单...</view>
		<view v-else class="ui-swiperContent">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						 :duration="duration">
							<swiper-item style="overflow-y: scroll;">
								<view class="swiper-item uni-bg-red">
									<uni-card @click="hrefTo(item.id)" title="已完成工单" note="true" v-for="(item,index) in list " :extra="item.receivetime | renderTime" :key="item.id">
										<view class="ui-item" >业主名称: <span class="ui-span">{{item.userName}}</span></view>
										<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
										<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
										<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
									
										<view v-if="item.content" class="ui-item">报修描述: <span  class="ui-span">{{item.content}}</span></view>
										<view class="ui-item" v-if="item.repImgArr">报修图片:</view>
										<view class="ui-item ui-display"  >
											<image v-if="itemImg" v-for="(itemImg,index) in item.repImgArr" :key="index" :src="host+''+itemImg" mode="aspectFill"></image>
										</view>
											<view class="ui-item">维修人: <span class="ui-span">{{item.maintName}}</span></view>
											<view class="ui-item" v-if="item.receivetext&&item.receivetext!='undefined'">维修描述: <span class="ui-span">{{item.receivetext}}</span></view>
											<view class="ui-item">维修时间: <span class="ui-span">{{item.receivetime | renderTime}}</span></view>
											<view class="ui-item" v-if="item.okImgArr">维修图片:</view>
										<view class="ui-item ui-display"  >
												<image v-if="itemImg" v-for="(itemImg,index) in item.okImgArr" :key="index" :src="host+''+itemImg" mode="aspectFill"></image>
											</view>
										<template v-slot:footer>
											<view class="footer-box">
												<uni-tag v-if="item.state==1" text="接单" type="primary" :circle="true"   @click="getOrder(item.id)"></uni-tag>
												<uni-tag v-if="item.state==2" text="处理工单" type="error" :circle="true" ></uni-tag>
												<uni-tag v-if="item.state==3" text="待评价" type="warning" :circle="true"  ></uni-tag>
												<uni-tag v-if="item.state==4" text="已完成" type="success" :circle="true" ></uni-tag>
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
				list:null,
				host:null,
			};
		},
		onLoad(){
			this.getList()
			this.host = this.$Host
		},
		filters:{
			 renderTime(date) {
			  var dateee = new Date(date).toJSON();
			  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
			}
		},
		onShow() {
				this.getList()
				this.host = this.$Host
		},
		methods:{
			getList(){
				let obj = {
					currPage:1,
					toatlNum:50,
					id:uni.getStorageSync("wordId"),
					state:3
					};
				this.$api.getOrderListByMaint(obj).then(res=>{
					 uni.hideLoading();
					 console.log(res)
					res.data.map((item,index)=>{
						if(item.repimgs!=null){
							item['repImgArr'] = item.repimgs.split(",")
						}
					})
					res.data.map((item,index)=>{
						if(item.okimgs!=null){
							item['okImgArr'] = item.okimgs.split(",")
						}
					})
					this.list =res.data.reverse()
				})
			}
		}
	}
</script>

<style lang="less">
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
