<template>
	<view class="content">
		<view class="content-c">
			<image class="load-img" src="../static/image/loading.gif" mode=""></image>
			<view class="load-text color-9">
				信息加载中.....
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			code: '',
			type: '',
			state: '',
			uuid: ''
		}
	},
	onLoad (options) {
		// 获取url上的参数
        this.code = this.getUrlParam('code')
        this.state = this.getUrlParam('state')
        this.uuid = this.$db.get('uuid')
		this.type = options.type
        this.userTrustLogin()
	},
	methods: {
		// 获取url地址参数
		getUrlParam (paraName) {
            let url = window.location.toString()
            let arrObj = url.split('?')
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&')
                let arr
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=')
                    if (arr != null && arr[0] == paraName) {
                        if ((arr[1].indexOf('#'))) {
                            let str
                            str = arr[1].split('#')
                            return str[0]
                        }
                        return arr[1]
                    }
                }
                return ''
            } else {
                return ''
            }
        },
		// 第三方登录
        userTrustLogin () {
			let data = {
				code: this.code,
				type: this.type,
				state: this.state,
				uuid: this.uuid
			}
            this.$api.trustLogin(data, res => {
                if (res.status) {
                    if (res.data.is_new) {
						//  未绑定手机号 跳转去绑定
                        this.$common.redirectTo('/pages/login/login/index?type=bind')
                    } else if (res.data) {
						// 登录成功
                        this.$db.set('userToken', res.data)
						uni.switchTab({
							url: '/pages/member/index/index'
						})
                    }
                } else {
					this.$common.errorToShow(res.msg)
				}
            })
        }
	}
}	
</script>

<style>
.content{
	position: relative;
	height: 80vh;
}
.content-c{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
}
.load-img{
	width: 100upx;
	height: 100upx;
}
.load-text{
	font-size: 26upx;
}
</style>
