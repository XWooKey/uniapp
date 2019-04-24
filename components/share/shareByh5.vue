<template>
	<view style="width: 100%;height: 300upx;background: #FFFFFF;position: absolute;left:0;bottom: 0;">
		<view class="share-pop">
			<view class="share-item" 
			v-for="(item, index) in providerList"
			:key="index"
			@click="clickHandler(item)">
				<image :src="item.img" mode=""></image>
				<view class="">{{ item.name }}</view>
			</view>
		</view>
		<view class="button-bottom">
			<button class="btn btn-w btn-square" @click="close()">关闭</button>
		</view>
	</view>	
</template>

<script>
import { baseUrl } from '@/config/config.js'	
export default {
	props: {
		// 商品id
		goodsId: {
			type: Number,
			default: 0
		},
		// 分享的图片
		shareImg: {
			type: String,
			default: ''
		},
		// 分享标题
		shareTitle: {
			type: String,
			default: ''
		},
		// 分享内容
		shareContent: {
			type: String,
			default: ''
		},
		// 分享链接
		shareHref: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			shareType: 0,
			providerList: [] // 分享通道 包含生成海报
		}
	},
	mounted () {
		/**
		 * 
		 * H5端分享两种 (微信浏览器内引导用户去分享, 其他浏览器)
		 * 
		 */
		if (this.$common.isWeiXinBrowser()) {
			// 微信浏览器里面
		} else {
			// 其他浏览器里面
			this.providerList = [
				{
					name: '分享给好友',
					cate: 'share',
					id: 'share',
					img: '../../../static/image/share-f.png',
					sort: 0
				},
				{
					name: '生成海报',
					cate: 'poster',
					id: 'poster',
					img: '../../../static/image/poster.png',
					sort: 1
				}
			]
		}
	},
	methods: {
		// 关闭弹出层
		close () {
			this.$emit('close')
		},
		// 点击操作
		clickHandler (e) {
			if (e.cate === 'poster') {
				this.createPoster()
			} else {
				// 去分享
				this.share(e)
			}
		},
		// 生成海报
		createPoster () {
			let data = {
				id: this.goodsId,
				type: 1
			}
			
			let pages = getCurrentPages()
			let page = pages[pages.length - 1]
			
			data.source = 1;
			data.return_url = baseUrl + 'wap/#/' + page.route;
			
			let userToken = this.$db.get('userToken')
			if (userToken) {
				data.token = userToken
			}
			
			this.$api.createPoster(data, res => {
				if (res.status) {
					this.close()
					this.$common.navigateTo('/pages/share?poster=' + res.data)
				} else {
					this.$common.errorToShow(res.msg)
				}
			})
		},
		// 分享操作
		share (e) {
			
		}
	}
}	
</script>

<style>
.share-pop{
	height: 300upx;
	width: 100%;
	display: flex;
}
.share-item{
	flex: 1;
	text-align: center;
	font-size: 26upx;
	color: #333;
	padding: 20upx 0;
}
.share-item image{
	width: 80upx;
	height: 80upx;
	margin: 20upx;
}	
.share-item .btn{
	line-height: 1;
	display: block;
	font-size: 26upx;
	background-color: #fff;
}
</style>
