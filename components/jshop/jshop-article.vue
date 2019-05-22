<template>
	<view class='cell-group bottom-cell-group' v-if="data.params.list.length > 0">
		<view class='cell-item'
		v-for="item in data.params.list"
		:key="item.id"
		@click="articleDetail(item.id)"
		>
			
			<view class="cell-item-bd">
				<view class="article-title ">
					{{ item.title }}
				</view>
				<view class="article-time">
					{{ item.ctime }}
				</view>
			</view>
			<view class="cell-title-img">
				<image :src="item.cover" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "jshoparticle",
	props: {
		data:{
			type: Object,
			required: true,
		}
	},
	methods: {
		// 查看文章详情
		articleDetail (articleId) {
			this.$common.navigateTo('/pages/article/index?article_id=' + articleId)
		}
	}
}
</script>

<style>
.cell-title-img{
	width: 160upx;
	height: 160upx;
	float: right;
}
.cell-title-img image{
	width: 100%;
	height: 100%;
}
.cell-item-bd{
	padding-right: 0;
	vertical-align: top;
	position: relative;
}
.article-title{
	font-size: 28upx;
	color: #333;
	width: 100%;
	min-height: 80upx;
	display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.article-time{
	font-size: 24upx;
	color: #999;
	display: inline-block;
	min-width: 220upx;
	min-height: 32upx;
	position: absolute;
	bottom: 0;
}

</style>
