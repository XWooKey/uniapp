<template>
	<view class="content">
		<view class="content-top">
			<view class='cell-group right-img'>
				<view class='cell-item'>
					<view class='cell-item-hd' @click="navigateToHandle('./user_info/index')">
						<!-- <image class='cell-hd-icon' src=''></image> -->
						<view class='cell-hd-title'>个人信息</view>
					</view>
					<view class='cell-item-ft'>
						<image class='cell-ft-next icon' src='/static/image/right.png'></image>
					</view>
				</view>
				<view class='cell-item'>
					<view class='cell-item-hd' @click="navigateToHandle('./user_info/password')">
						<view class='cell-hd-title'>修改密码</view>
					</view>
					<view class='cell-item-ft'>
						<image class='cell-ft-next icon' src='../../../static/image/right.png'></image>
					</view>
				</view>
				<view class='cell-item'>
					<view class='cell-item-hd' @click="clearCache">
						<!-- <image class='cell-hd-icon' src=''></image> -->
						<view class='cell-hd-title'>清除缓存</view>
					</view>
					<view class='cell-item-ft'>
						<image class='cell-ft-next icon' src='/static/image/right.png'></image>
					</view>
				</view>
				<view class='cell-item'>
					<view class='cell-item-hd' @click="aboutUs">
						<!-- <image class='cell-hd-icon' src='/static/image/me-ic-about.png'></image> -->
						<view class='cell-hd-title'>关于我们</view>
					</view>
					<view class='cell-item-ft'>
						<image class='cell-ft-next icon' src='/static/image/right.png'></image>
					</view>
				</view>
				<view class='cell-item'>
					<view class='cell-item-hd' @click="logOff">
						<!-- <image class='cell-hd-icon' src='/static/image/me-ic-about.png'></image> -->
						<view class='cell-hd-title'>退出</view>
					</view>
					<view class='cell-item-ft'>
						<image class='cell-ft-next icon' src='/static/image/right.png'></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="button-bottom">
			<button class="btn btn-b">退出登录</button>
		</view> -->
	</view>
</template>

<script>
export default {
  methods: {
    navigateToHandle(pageUrl) {
      this.$common.navigateTo(pageUrl)
    },
    // 清除缓存
    clearCache() {
      // 重新获取统一配置信息
      this.$api.shopConfig(res => {
        this.$store.commit('config', res)
      })
      // 删除地区缓存信息
      this.$db.del('areaList')
      setTimeout(() => {
        this.$common.successToShow('清除成功')
      }, 500)
    },
    // 关于我们
    aboutUs() {
	  let articleId = this.$store.state.config.about_article_id;
      this.$common.navigateTo('/pages/article/index?id_type=1&id=' + articleId);
    },
    // 退出登录
    logOff() {
      this.$common.modelShow('退出', '确认退出登录吗?', () => {
        this.$db.del('userToken')
        uni.reLaunch({
          url: '/pages/index/index'
        })
      })
    }
  }
}
</script>

<style>
</style>
