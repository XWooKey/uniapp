<template>
	<view class="content my-store">
		<view class="" ref="myStore">
			<view class="my-store-t">
				<view class="mst-top">
					<image :src="store_banner_src" mode="widthFix"></image>
				</view>
				<view class="mst-bot">
					<view class='member-grid'>
						<view class='member-item'>
						  <image class='member-item-img' :src='store_logo_src'></image>
						</view>
						<view class='member-item'>
							<view class="color-o fsz36">115</view>
							<text class='member-item-text'>全部宝贝</text>
						</view>
						<view class='member-item' @click="openPopup()">
							<image class='member-item-icon' src='../../../static/image/ic-me-collect.png'></image>
							<text class='member-item-text'>收藏本店</text>
						</view>
						<view class='member-item'>
							<!-- #ifdef MP-WEIXIN -->
							<button class='share btn' open-type="share">
								<image class='member-item-icon' src='../../../static/image/qr_code.png'></image>
								<text class='member-item-text'>二维码</text>
							</button>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<button class='share btn' @click="createPoster()">
								<image class='member-item-icon' src='../../../static/image/qr_code.png'></image>
								<text class='member-item-text'>二维码</text>
							</button>
							<!-- #endif -->
							
						</view>
					</view>
				</view>
			</view>
			<view class="my-store-m">
				<view class="search">
					<view class="search-c" @click="goSearch">
						<view class="search-input search-input-p">
							<view class="search-input-p-c">
							{{ searchKey }}
							</view>
						</view>
						<image class="icon search-icon" src="../../../static/image/zoom.png"></image>
					</view>
				</view>
			</view>
			<!-- 收藏弹出窗 -->
			<lvv-popup position="bottom" ref="lvvpopref" @click="closePopup()">
				<view class="collect-pop"  @click="closePopup()">
					<image v-if="isWeixinBrowser" src="../../../static/image/wxh5.png" mode="widthFix"></image>
					<!-- #ifdef MP-WEIXIN -->
					<image src="../../../static/image/wxxcx.png" mode="widthFix"></image>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="h5-tip color-f fsz38">
						<view>请将此页面添加浏览器书签</view>
						<view>方便下次浏览</view>
					</view>
					<!-- #endif -->
				</view>
			</lvv-popup>
		</view>
		
		<!-- 商品列表 -->
		<scroll-view v-bind:scroll-y="scrollY" :scroll-into-view="toView" class="scroll-Y" @scrolltolower="lower" enable-back-to-top="true" lower-threshold="50">
			<!-- 表格图片 -->
			<view class="img-grids">
				<view v-if="goodsList.length>0">
					<view class="img-grids-item" v-for="(item, index) in goodsList" :key="index" @click="goodsDetail(item.id)">
						<image class="img-grids-item-t have-none" :src="item.image_url" mode='aspectFill'></image>
						<view class="img-grids-item-b">
							<view class="goods-name grids-goods-name">
								{{item.name}}
							</view>
							<view class="goods-item-c">
								<view class="goods-price red-price">￥{{item.price}}</view>
								<image class="goods-cart" src="../../static/image/ic-car.png"></image>
							</view>
						</view>
					</view>
				</view>
				<!-- 无数据时默认显示 -->
				<view class="order-none" v-else>
					<image class="order-none-img" src="../../static/image/order.png" mode=""></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import lvvPopup from '@/components/lvv-popup/lvv-popup.vue';
import {apiBaseUrl} from '@/config/config.js'
export default{
	components:{lvvPopup},
	data() {
		return {
			goodsList: [],
			ajaxStatus: false,
			loading: true,
			loadingComplete: false,
			nodata: false,
			toView: '',
			searchData: {
				where: {},
				limit: 10,
				page: 1,
				order: {
					key: 'sort',
					sort: 'asc'
				}
			},
			searchKey: '请输入关键字搜索',
			orderItems: [
			  {
			    name: '全部宝贝',
			    nums: '115'
			  },
			  {
			    name: '收藏本店',
			    icon: '../../../static/image/ic-me-collect.png',
			  },
			  {
			    name: '二维码',
			    icon: '../../../static/image/qr_code.png',
			  }
			],
			storeCode: '',
			store_name:'',//店铺名称
			store_logo:'',
			store_logo_src:'',
			store_banner:'',
			store_desc:'',//店铺介绍
			store_banner_src:'',
			scrollY: false,
			top_height: '', //上半部分内容高度
			slide_height: '', //页面滑动高度
			isWeixinBrowser: this.$common.isWeiXinBrowser(), //判断是否是微信浏览器
		}
	},
	//加载执行
	onLoad: function(options) {
		var where = {};
		if (options.id) {
			where = {
				cat_id: options.id
			};
			//this.getGoodsClass(options.id);
		}
		if (options.key) {
			where = {
				search_name: options.key
			};
			this.searchKey = options.key;
		}

		if(options.cat_id){
			where.cat_id = options.cat_id
		}
		if(options.brand_id){
			where.brand_id =options.brand_id
		}
		// this.setSearchData({
		// 	where: where
		// });
		let store = options.store;
		this.storeCode = store;
		// console.log(options.store)
		this.getDistribution(store);
		this.getGoods();
		// this.slideTop();
	},
	mounted() {
		// window.addEventListener('scroll', this.handleScroll)
	},
	updated() {
		// #ifndef MP-WEIXIN
		// 获取上半部分的整体高度
		this.$nextTick(() => {
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.top_height = this.$refs.myStore.$el.clientHeight;
		})
		// #endif
	},
	onPageScroll(){
		var _this = this;
		// #ifdef MP-WEIXIN
		const query = wx.createSelectorQuery().in(this)
		  query.select('.scroll-Y').boundingClientRect(function(res){
			if(res.top>0){
				_this.scrollY = false;
			}else{
				_this.scrollY = true;
			}
		  }).exec()
		// #endif
	},
	methods: {
		// 滑动整个页面到下半部分停止
		handleScroll () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			this.slide_height = scrollTop;
			this.slide_height >= this.top_height? this.scrollY = true : this.scrollY = false;
		},
		// 显示modal弹出框
		openPopup() {
			this.$refs.lvvpopref.show();
		},
		// 关闭modal弹出框
		closePopup() {
			this.$refs.lvvpopref.close();
		},

		
		//设置查询条件
		setSearchData: function(searchData, clear = false) {
			var sd = this.searchData;
			this.searchData = this.$common.deepCopy(sd, searchData)
			if (clear) {
				this.goodsList = [];
			}
		},
		onChangeShowState: function() {
			var _this = this;
			_this.showView = !_this.showView;
		},

		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {},
		//跳转到商品详情页面
		goodsDetail: function(id) {
			let url = '/pages/goods/index/index?id=' + id;
			this.$common.navigateTo(url);
		},
		//取得商品数据
		getGoods: function() {
			var _this = this;
			if (_this.ajaxStatus) {
				return false;
			}
			_this.ajaxStatus = true;
			_this.loading = true;
			_this.loadingComplete = false;
			_this.nodata = true;
			//如果已经没有数据了，就不取数据了，直接提示已经没有数据
			if (_this.loadingComplete) {
				_this.$common.errorToShow("暂时没有数据了")
				return false;
			}
			
			
			_this.$api.goodsList(_this.conditions(), function(res) {
				if (res.status) {
					//判是否没有数据了，只要返回的记录条数小于总记录条数，那就说明到底了，因为后面没有数据了
					var isEnd = false;
					if (res.data.list.length < _this.searchData.limit) {
						isEnd = true;
					}
					//判断是否为空
					var isEmpty = false;
					if (_this.searchData.page == 1 && res.data.list.length == 0) {
						isEmpty = true;
					}
					
					_this.goodsList = _this.goodsList.concat(res.data.list);
					_this.ajaxStatus = false;
					_this.loading = !isEnd && !isEmpty;
					_this.toView = '';
					_this.loadingComplete =  isEnd && !isEmpty;
					_this.nodata = isEmpty;
					if(res.data.filter){
						let filter = res.data.filter;
						if(filter.brand_ids){
							for(let i = 0; i < filter.brand_ids.length; i++){
								filter.brand_ids[i].isSelect = false;
							}
							_this.brand_list = filter.brand_ids;
						}
						if(filter.goods_cat){
							for(let i = 0; i < filter.goods_cat.length; i++){
								filter.goods_cat[i].isSelect = false;
							}
							_this.cat_list = filter.goods_cat;
						}
						if(filter.label_ids){
							for(let i = 0; i < filter.label_ids.length; i++){
								filter.label_ids[i].isSelect = false;
							}
							_this.label_list = filter.label_ids;
						}
					}
				}
			});
		},
		//获取分销商信息
		getDistribution:function(store){
			let _this = this;
			_this.$api.getStoreInfo({store:store}, function(res) {
				if (res.status) {
					_this.store_name = res.data.store_name;
					_this.store_desc = res.data.store_desc;
					_this.store_logo_src = res.data.store_logo_src;
					_this.store_logo = res.data.store_logo;
					_this.store_banner_src = res.data.store_banner_src;
					// uni.setNavigationBarTitle({
					// 	title: _this.store_name
					// });
				} else {
					//报错了
					_this.$common.errorToShow(res.msg);
				}
			});
		},
		//上拉加载
		lower: function() {
			var _this = this;
			_this.toView = 'loading';
			if (!_this.loadingComplete) {
				_this.setSearchData({
					page: _this.searchData.page + 1
				});
				_this.getGoods();
			}
		},

		// 统一返回筛选条件 查询条件 分页
		conditions () {
			let data = this.searchData;
			var newData = {};
			newData = this.$common.deepCopy(newData,data);
			//把data里的where换成json
			if(data.where){
				newData.where = JSON.stringify(data.where);
			}
			//把排序换成字符串
			if(data.order){
				var sort = data.order.key + ' ' + data.order.sort;
				if(data.order.key != 'sort'){
					sort = sort + ',sort asc'   //如果不是综合排序，增加上第二个排序优先级排序
				}
				newData.order = sort;
			}else{
				newData.order = 'sort asc';
			}
			return newData;
		},

		//去搜索
		goSearch() {
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2];
			// #ifdef H5 || MP-WEIXIN
			if(prevPage && prevPage.route){
				let search_flag = prevPage.route;
				if (search_flag == 'pages/index/search') {
					uni.navigateBack({
						delta: 1
					});
				}else{
					this.$common.navigateTo('/pages/index/search');
				}
			}else{
				this.$common.navigateTo('/pages/index/search');
			}
			// #endif
			
			// #ifdef MP-ALIPAY
			if(prevPage && prevPage.__proto__.route){
				let search_flag = prevPage.__proto__.route;
				if (search_flag == 'pages/index/search') {
					uni.navigateBack({
						delta: 1
					});
				}else{
					this.$common.navigateTo('/pages/index/search');
				}
			}else{
				this.$common.navigateTo('/pages/index/search');
			}
			// #endif
		},
		// 生成邀请海报
		createPoster() {
			let data = {
				type: 4,
				id: this.storeCode
			}
			
			let pages = getCurrentPages()
			let page = pages[pages.length - 1]
			let page_path = '/pages/share/jump';
			// #ifdef H5
			data.source = 1;
			data.return_url = apiBaseUrl + 'wap/#' + page_path;
			// #endif
		
			// #ifdef MP-WEIXIN
			data.source = 2;
			data.return_url = page_path;
			// #endif
		
			// #ifdef MP-ALIPAY
			data.source = 3;
			data.return_url = page_path;
			// #endif
		
			let userToken = this.$db.get('userToken')
		
			if (userToken) {
				data.token = userToken
			}
			this.$api.createPoster(data, res => {
				if (res.status) {
					this.$common.navigateTo('/pages/share?poster=' + res.data)
				} else {
					this.$common.errorToShow(res.msg)
				}
			})
		},
	},
	//分享
	onShareAppMessage() {
		let myInviteCode = this.myShareCode ? this.myShareCode : '';
		let ins = encodeURIComponent('type=3&invite=' + myInviteCode);
		let path = '/pages/share/jump?scene=' + ins;
		return {
			title: this.$store.state.config.share_title,
			// #ifdef MP-ALIPAY
			desc: this.$store.state.config.share_desc,
			// #endif
			imageUrl: this.$store.state.config.share_image,
			path: path
		}
	}

}
</script>

<style>
.mst-top{
	width: 100%;
}
.mst-top image{
	width: 100%;
}
.member-grid{
	border-top: 2upx solid #ddd;
	background-color: #fff;
	margin-bottom: 20upx;
}
.member-item{
	border-right: 2upx solid #eee;
	height: 90upx;
}
.member-item:last-child{
	border-right: none;
}
.member-item-img{
	width: 150upx;
	height: 150upx;
	top: -70upx;
	position: absolute;
	left: 42%;
	transform: translateX(-50%);
	border-radius: 10upx;
	background-color: #fff;
	border-radius: 6upx;
	box-shadow: 0 0 10upx #ccc;
}
.img-grids{
	padding-bottom: 26upx;
}
.img-grids-item{
	margin-bottom: 0;
}
.scroll-Y{
	/*  #ifdef  H5  */
	height:calc(100vh - 44px - 0upx);
	/*  #endif  */
	/*  #ifndef H5 */
	height:calc(100vh - 0upx);
	/*  #endif  */
	position: position;
	/* bottom: 0; */
}
.collect-pop{
	width: 100%;
	height: 100%;
	/* background: #FFFFFF; */
	position: absolute;
	left:0;
	bottom: 0;
	/* transform: ; */
}
.collect-pop image{
	width: 100%;
}
.h5-tip{
	text-align: center;
	margin-top: 300upx;
}
.member-item .share{
	background: none !important;
	line-height: normal;
}
</style>
