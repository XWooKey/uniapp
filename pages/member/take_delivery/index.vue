<template>
	<view class="content">
		<view class="content-top">
			<view class="ad" >
				<image class="ad-img" src="../../../static/demo-img/banner.png" mode="widthFix" ></image>
			</view>
			<view class='search'>
				<view class='search-c'>
					<image class='icon search-icon' src='../../../static/image/zoom.png'></image>
					<input class='search-input' placeholder-class='search-input-p' placeholder='请输入完整提货单号、订单号、提货手机号' v-model="key"></input>
				</view>
				<button class="btn btn-g" hover-class="btn-hover2" @click="search">查询</button>
			</view>
			<view class="img-list">
				<view v-for="(item, key) in goodsList" :key="key">
					<view class="img-list-item">
						<image class="img-list-item-l" :src="item.image_url" mode='aspectFill'></image>
						<view class="img-list-item-r">
							<view class="goods-name list-goods-name">{{item.name}}</view>
							<view class="goods-item-c">
								<view class="goods-buy">
									<view class="goods-salesvolume">规格：{{item.addon}}</view>
									<view class="goods-salesvolume">数量：{{item.nums}}</view>
									<view class="goods-salesvolume">SN码：{{item.sn}}</view>
									<view class="goods-salesvolume">BN码：{{item.bn}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="button-bottom" v-if="allData.status == 1 || allData.status == 2">
			<button class="btn btn-b btn-square" @click="write" v-if="allData.status == 1">确认核销</button>
			<button class="btn btn-b btn-square completed" v-else-if="allData.status == 2">已核销</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				key: '',
				goodsList: [],
				lading_id: false,
				isgo: false,
				isgotext: '确认核销',
				allData: {}
			}
		},
		onLoad(e){
			if(e.id){
				this.key = e.id;
			}
			this.getLadingInfo();
		},
		methods: {
			//获取提货单详情
			getLadingInfo() {
				if(this.key){
					let data = {
						'key': this.key
					}
					this.$api.ladingInfo(data, e => {
						if (e.status) {
							this.isGoWrite(e.data);
						} else {
							this.$common.modelShow('提货单不存在或你无权查看', '该提货单不存在或不属于你管辖的店铺，你无法查看该提货单详情。', function(){});
						}
					});
				}
			},

			//搜索
			search() {
				if(this.key != ''){
					this.getLadingInfo();
				}else{
					this.$common.errorToShow('请输入查询关键字');
					return false;
				}
			},
	
			//查询判断是否可以核销
			isGoWrite(data) {
				let isgo = false;
				if (data.order_info.pay_status == 2 && data.order_info.ship_status == 3){
					isgo = true;
					this.lading_id = data.id;
					this.goodsList = data.goods;
					this.allData = data;
				} else {
					this.$common.modelShow('无法核销', '订单必须支付并已发货才可以核销', function(){});
				}
				this.isgo = isgo;
			},
	
			//去核销
			write() {
				let _this = this;
				if(this.isgo){
					this.$common.modelShow('提示', '您确认核销吗？', function(res){
						//去核销
						let data = {
							lading_id: _this.lading_id
						}
						_this.$api.ladingExec(data, res => {
							if(res.status) {
								_this.allData.status = 2;
							}else{
								_this.allData.status = 1;
							}
						});
					});
				}
			}
		}
	}
</script>

<style>
.ad {
	width: 100%;
	/* margin: 20upx 0; */
	overflow: hidden;
}
.ad-img{
	width: 100%;
	float: left;
	margin-bottom: 20upx;
}
.ad-img:last-child{
	margin-bottom: 0;
}
.search{
	display: flex;
}
.search-c{
	width: 85%;
	margin-right: 2%;
}
.search-icon{
	left: 20upx;	
}
.search-input {
	padding: 10upx 30upx 10upx 70upx;
}
.search-input-p{
	padding: 0 !important;
}
.search .btn{
	width: 15%;
	border: none;
	background-color: #f1f1f1;
	font-size: 26upx;
	color: #333;
	border-radius: 6upx;
	line-height: 72upx;
	padding-left: 18upx;
	padding-right: 18upx;
}
.list-goods-name{
	margin-bottom: 8upx;
}
.goods-salesvolume{
	display: block;
	margin-bottom: 6upx;
}
.completed{
	background-color: #d9d9d9;
	color: #4e4e4e;
}
</style>
