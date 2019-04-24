<template>
	<view class="content">
		<view class="ig-top">
			<view class="ig-top-t">
				<view class="">
					23:19:66
				</view>
			</view>
			<view class="ig-top-m">
				<view class="user-head-img-c">
					<view class="user-head-img-tip">拼主</view>
					<image class="user-head-img cell-hd-icon have-none" src="../../../static/demo-img/user-head.jpg" mode=""></image>
				</view>
				<view class="user-head-img-c">
					<image class="user-head-img cell-hd-icon have-none" src="../../../static/demo-img/user-head.jpg" mode=""></image>
				</view>
				<view class=".user-head-img-c uhihn"><text>?</text></view>
			</view>
			<view class="ig-top-b">
				<view class="igtb-top">
					还差<text class="red-price">1</text>人，赶快邀请好友来拼单吧
				</view>
				<view class="igtb-mid">
					<button class="btn">邀请好友拼单</button>
				</view>
				<view class="igtb-bot">
					分享好友越多，成团越快
				</view>
			</view>
		</view>
		<view class="cell-group margin-cell-group">
			<view class='cell-item'>
				<view class='cell-item-hd'>
					<view class='cell-hd-title'>商品名称</view>
				</view>
				<view class='cell-item-ft'>
					<text class="cell-ft-text">这里是商品名称这里是商品名称这里是商品名称这里是商品名称这里是商品名称</text>
				</view>
			</view>
			<view class='cell-item'>
				<view class='cell-item-hd'>
					<view class='cell-hd-title'>拼单时间</view>
				</view>
				<view class='cell-item-ft'>
					<text class="cell-ft-text">2019/04/16 19:17:25</text>
				</view>
			</view>
			<view class='cell-item'>
				<view class='cell-item-hd'>
					<view class='cell-hd-title'>拼单须知</view>
				</view>
				<view class='cell-item-ft group-notice'>
					<text class="cell-ft-text">* 好友拼单 </text>
					<text class="cell-ft-text">* 人满发货 </text>
					<text class="cell-ft-text">* 人不满退款 </text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
.ig-top{
	text-align: center;
	background-color: #fff;
	padding: 20upx 26upx;
}
.ig-top-t,.ig-top-m{
	margin-bottom: 20upx;
}
.ig-top-t>view{
	display: inline-block;
	background-color: #f3f3f3;
	padding: 0 10upx;
	color: #999;
	font-size: 26upx;
}
.user-head-img-c{
	position: relative;
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	margin-right: 20upx;
	box-sizing: border-box;
	display: inline-block;
	/* float: left; */
	border: 1px solid #f3f3f3;
}
.user-head-img-tip{
	position: absolute;
	top: -6upx;
	left: -10upx;
	display: inline-block;
	background-color: #FF7159;
	color: #fff;
	font-size: 22upx;
	z-index: 99;
	padding: 0 10upx;
	border-radius: 10upx;
	transform: scale(.8);
}
.user-head-img-c .user-head-img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.user-head-img-c:first-child{
	border: 1px solid #FF7159;
}
.uhihn{
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	display: inline-block;
	border: 2upx dashed #e1e1e1;
	text-align: center;
	color: #d1d1d1;
	font-size: 40upx;
	box-sizing: border-box;
	position: relative;
}
.uhihn>text{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.igtb-top{
	font-size: 32upx;
	color: #333;
	margin-bottom: 16upx;
}
.igtb-mid{
	margin-bottom: 16upx;
}
.igtb-mid .btn{
	width: 100%;
	background-color: #FF7159;
	color: #fff;
}
.igtb-bot{
	font-size: 24upx;
	color: #666;
}
.cell-ft-text{
	max-width: 520upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.group-notice .cell-ft-text{
	color: #999;
	margin-left: 20upx;
	font-size: 26upx;
}
</style>
