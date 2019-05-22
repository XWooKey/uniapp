<template>
	<view class="imgwindow bottom-cell-group">
		<view class="imgwindow-list" v-if="data.params.limit == '3' ||data.params.limit == '4' ||data.params.limit == '5'" v-bind:class="'row'+data.params.limit">
			<view class="imgwindow-item" ref="imgwitem" v-for="(item, index) in data.params.list" :key="index">
				<image class="imgwindow-item-img" :src="item.image" mode="aspectFill" @click="showSliderInfo(item.linkType, item.linkValue)"></image>
				<view class="imgwindow-item-text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "jshopnavbar",
	props: {
		data:{
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			height:'',
			height1:''
		}
	},
	onLoad(){
		
	},
	mounted(){
		
	},
	methods: {
		showSliderInfo(type, val) {
			if (type == 1) {
				// URL
				// #ifdef H5
				window.location.href = val
				// #endif
			} else if (type == 2) {
				// 商品详情
				this.goodsDetail(val)
			} else if (type == 3) {
				// 文章详情
				this.$common.navigateTo('/pages/article/index?article_id=' + val)
			} else if (type == 4) {
				// 文章列表
				this.$common.navigateTo('/pages/article/list?cid=' + val)
			}
		},
		//跳转到商品详情页面
		goodsDetail: function(id) {
			let ins = encodeURIComponent('id='+id);
			let url = '/pages/goods/index/index?scene=' + ins;
			this.$common.navigateTo(url);
		},
	}
}
</script>

<style>
.imgwindow{
	width: 100%;
	background-color: #fff;
}
.imgwindow-list{
	overflow: hidden;
	padding: 24upx 0 0;
}
/* 堆积两列 */
.imgwindow-list .imgwindow-item{
	height: auto;
	float: left;
	padding: 0upx 10upx;
	margin-bottom: 20upx;
	text-align: center;
}
.imgwindow-list .imgwindow-item image{
	width: 90upx;
	height: 90upx;
	margin-bottom: 6upx;
}
.imgwindow-item-text{
	font-size: 26upx;
	color: #666;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.imgwindow-list.row3 .imgwindow-item{
	width: 33.3%;
}
.imgwindow-list.row4 .imgwindow-item{
	width: 25%;
}
.imgwindow-list.row5 .imgwindow-item{
	width: 20%;
}
.imgwindow-list.row5 .imgwindow-item .imgwindow-item-text{
	font-size: 24upx;
}
</style>
