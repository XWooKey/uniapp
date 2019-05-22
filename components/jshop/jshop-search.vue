<template>
	<!-- 搜索框 -->
	<view class="search">
		<view class='search-c' @click='goSearch()'>
			<view class='search-input search-input-p' v-bind:class="data.params.style">
				<view class="search-input-p-c">
					{{data.params.keywords}}
				</view>
			</view>
			<image class='icon search-icon' src='../../static/image/zoom.png'></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "jshopsearch",
		props: {
			data:{
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				keyword:'',
			};
		},
		created() {
			
		},
		watch: {
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/index/search'
				});
			},
		}
	}
</script>

<style>
.search-input-p {
	color: #888;
}
.square{
	border-radius: 0;
}
.radius{
	border-radius: 12upx;
}
/* .isOpacity {
		background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
		transition: all .5s;
	}

.isOpacity .search-input {
	background-color: rgba(255, 255, 255, .5);
	transition: all .5s;
} */
</style>
