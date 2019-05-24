<template>
	<view class="content" style="padding-top: 0upx;">
		<jshop :data="pageData"></jshop>
		<jihaiCopyright></jihaiCopyright>
	</view>
</template>
<script>
	import jshop from "@/components/jshop/jshop.vue"
	import jihaiCopyright from "@/components/jihai-copyright/jihaiCopyright.vue"
	import {
		goods
	} from '@/config/mixins.js'
	export default {
		mixins: [goods],
		components:{jihaiCopyright,jshop},
		data() {
			return {
				myShareCode: '', //分享Code
				imageUrl: '/static/image/share_image.png', //店铺分享图片
				pageData:[],
				pageCode:'mobile_home',//页面布局编码
			}
		},
		computed: {
			appTitle(){
				return this.$store.state.config.shop_name;
			}
		},
		onLoad(e) {
			let scene = decodeURIComponent(e.scene);
			let arr1 = scene.split('&');
			let invite = '';
			for (var i = 0; i < arr1.length; i++) {
				let key = arr1[i].split("=")[0];
				if (key == 'invite') {
					invite = arr1[i].split("=")[1];
				}
			}
			if (invite != '') {
				this.$db.set("invitecode", invite);
			}
			//增加页面编码，可自定义编码
			if(e.page_code){
				this.pageCode = e.page_code;
			}
			this.initData();
		},
		
		mounted() {
			// #ifdef H5 
			window.addEventListener('scroll', this.handleScroll)
			// #endif
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				// console.log(scrollTop)
				// var offsetTop = document.querySelector('#searchBar').offsetTop
				scrollTop > 50 ? this.searchBarOpacity = true : this.searchBarOpacity = false
			},
			destroyed() {
				window.removeEventListener('scroll', this.handleScroll)
			},
			goSearch() {
				uni.navigateTo({
					url: './search'
				});
			},
			// 首页初始化获取数据
			initData() {
				//获取首页配置
				this.$api.getPageConfig({
					code:this.pageCode,
				}, res => {
					if(res.status == true){
						this.pageData = res.data;
					}
				});
				
				//获取地区信息
				this.$api.getAreaList({}, res => {
					if(res.status){
						this.$db.set("areaList",res.data);
					}
				});
			}
		},
		onShareAppMessage() {
			let userToken = this.$db.get('userToken');
			if (userToken) {
				let myInviteCode = this.myShareCode;
				if (myInviteCode) {
					//缓存里面有邀请码
					let ins = encodeURIComponent('invite=' + myInviteCode);
					let path = '/pages/index/index?scene=' + ins;
					return {
						title: this.appTitle,
						path: path,
						imageUrl: this.imageUrl
					}
				} else {
					let path = '/pages/index/index';
					return {
						title: this.appTitle,
						path: path,
						imageUrl: this.imageUrl
					}
				}
			} else {
				//用户没有登录
				let path = '/pages/index/index';
				return {
					title: this.appTitle,
					path: path,
					imageUrl: this.imageUrl
				}
			}
		},
		onPullDownRefresh() {
			this.initData();
			//this.$db.del('all_cat');
			uni.stopPullDownRefresh();
		}
	}
</script>

<style>
	.search {
		/* position: fixed; */
		/*  #ifdef  H5  */
		/* top: 44px; */
		/*  #endif  */
		/*  #ifndef  H5  */
		/* top: 0; */
		/*  #endif  */
	}

	.cell-item {
		border: none;
	}

	.cell-ft-text {
		font-size: 22upx;
		color: #999;
	}

	/* .new-goods {
		min-height: 300upx;
		white-space: nowrap;
		width: 100%;
	}

	.new-goods-item {
		width: 200upx;
		display: inline-block;
		margin-right: 20upx;
	}

	.new-goods-item:last-child {
		margin-right: 0;
	}

	.news-goods-img {
		width: 200upx;
		height: 200upx;
	}

	.news-goods-img image {
		width: 100%;
		height: 100%;
	}

	.news-goods-bot {
		margin-top: 6upx;
	}

	.new-goods-name {
		display: block;
		font-size: 26upx;
	}

	.new-goods-price {
		display: block;
		font-size: 26upx;
		color: #e14d4d;
	} */
	
	
</style>
