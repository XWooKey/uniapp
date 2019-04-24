<script>
	export default {
		onLaunch () {
			// 获取店铺配置信息  全局只请求一次
			let _this = this
			_this.$api.shopConfig(res => {
				_this.$store.commit('config', res)
				
				// #ifdef APP-PLUS
				if (res.app_update_auto) {
					_this.checkVersion()
				}
				// #endif
			})
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			// #ifdef APP-PLUS
			// app更新检测
			checkVersion () {
				// 获取应用版本号
				let version = plus.runtime.version
				
				//检测当前平台，如果是安卓则启动安卓更新  
				uni.getSystemInfo({
					success:(res) => {
						this.updateHandler(res.platform, version)
					}
				})
			},
			// 更新操作
			updateHandler (platform, version) {
				let data = {
					platform: platform,
					version: version
				}
				
				this.$api.appUpdate(data, res => {
					if (res.status) {
						const info = res.data[0]
						if (info.version !== '' && info.version > version) {
							uni.showModal({ //提醒用户更新
								title: '更新提示',
								content: info.note,
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(info.download_url);
									}
								}
							})
						}
					}
				})
			}		
			// #endif
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/css/style.css";
</style>
