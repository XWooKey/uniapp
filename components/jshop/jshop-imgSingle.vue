<template>
	<!-- 广告位 -->
	<view class="ad bottom-cell-group" v-if="data.params.list && data.params.list.length > 0">
		<image class="ad-img" v-for="item in data.params.list" :key="item.id" :src="item.image" mode="widthFix" @click="showSliderInfo(item.linkType, item.linkValue)"></image>
	</view>
</template>

<script>
export default {
	name: "jshopimgsingle",
	props: {
		data:{
			type: Object,
			required: true,
		}
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
	},
}
</script>

<style>
.ad {
	width: 100%;
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
</style>
