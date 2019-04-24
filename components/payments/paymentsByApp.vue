<template>
	<view class='cell-group payment-method'>
		<view class='cell-item add-title-item'
		v-for="item in payments"
		:key="item.code"
		@click="toPayHandler(item.code)"
		v-if="!(type == 2 && item.code == 'balancepay')"
		>
			<view class='cell-item-hd'>
				<image class='cell-hd-icon' :src='item.icon'></image>
			</view>
			<view class='cell-item-bd'>
				<view class="cell-bd-view">
					<text class="cell-bd-text">{{ item.name }}</text>
				</view>
				<view class="cell-bd-view">
					<text class="cell-bd-text address">{{ item.memo }}</text>
				</view>
			</view>
			<view class='cell-item-ft'>
				<image class='cell-ft-next icon' src='../../../static/image/right.png'></image>
			</view>
		</view>
	</view>
</template>

<script>
import { baseUrl } from '@/config/config.js'
export default {
	props: {
		// 如果是商品订单此参数必须
		orderId: {
			type: String,
			default () {
				return ''
			}
		},
		// 如果是充值订单此参数必须
		recharge: {
			type: Number,
			default () {
				return 0
			}
		},
		// 用户id
		uid: {
			type: Number,
			default () {
				return 0
			}
		},
		// 订单类型
		type: {
			type: Number,
			default () {
				return 1
			}
		}
	},
	data () {
		return {
			payments: []
		}
	},
	mounted () {
		
		this.getPayments()
	},
	methods: {
		// 获取可用支付方式列表
		getPayments () {
			this.$api.paymentList({}, res => {
				if (res.status) {
					this.payments = this.formatPayments(res.data)
				}
			})
		},
		// 支付方式处理
		formatPayments (payments) {
			// 过滤非线上支付方式
			payments = payments.filter(item => item.is_online === 1)

			// 如果是充值订单 过滤余额支付
			if (this.type === 2) {
				payments = payments.filter(item => item.code !== 'balancepay')
			}
			
			// 设置logo图片
			payments.forEach(item => {
				this.$set(item, 'icon', '/static/image/' + item.code + '.png')
			})
			return payments
		},
		// 用户点击支付方式处理
		toPayHandler (code) {
			let _this = this
			
			let data = {
				payment_code: code,
				payment_type: _this.type
			}
			
			data['ids'] = _this.type == 1 ? _this.orderId : _this.uid
			
			switch (code) {
				case 'alipay':
				/**
				 * 支付宝支付需要模拟GET提交数据
				 */
				if (_this.type == 1 && _this.orderId) {
					data['params'] = {
						trade_type: 'APP'
					}
				} else if (_this.type == 2 && _this.recharge) {
					data['params'] = {
						trade_type: 'APP',
						money: _this.recharge
					}
				}
				
				_this.$api.pay(data, res => {
					if (res.status) {
						uni.requestPayment({  
							provider: "alipay",  
							orderInfo: res.data.data,
							success: function(res){
								_this.$common.successToShow('支付成功', () => {
									_this.redirectHandler()
								})
							}
						});
					} else {
						_this.$comon.errorToShow(res.msg)
					}
				})
				break
				case 'wechatpay':
					// 微信 H5支付
					if (_this.type == 1 && _this.orderId) {
						data['params'] = {
							trade_type: 'APP'
						}
					} else if (_this.type == 2 && _this.recharge) {
						data['params'] = {
							trade_type: 'APP',
							money: _this.recharge
						}
					}
					
					// 微信app支付
					_this.$api.pay(data, res => {
						if (res.status) {
							// 调用微信支付  
							uni.requestPayment({  
								provider: "wxpay",  
								orderInfo: {
									appid: res.data.appid,
									noncestr: res.data.noncestr,
									package: res.data.package,
									partnerid: res.data.partnerid,
									prepayid: res.data.prepayid,
									timestamp: res.data.timestamp,
									sign: res.data.sign,
								},
								success: function(res){
									_this.$common.successToShow('支付成功', () => {
										_this.redirectHandler()
									})
								}
							});
						} else {
							_this.$common.errorToShow(res.msg)
						}
					})
					break
				case 'balancepay':
					/**
					 *  用户余额支付
					 * 
					 */
					_this.$api.pay(data, res => {
						if (res.status) {
							_this.redirectHandler()
						} else {
							_this.$common.errorToShow(res.msg)
						}
					})
					break
				case 'offline':
					/**
					 * 线下支付
					 */
					_this.$common.modelShow('线下支付说明', '请联系客服进行线下支付', () => {
						_this.$common.redirectTo('/pages/member/order/orderdetail?order_id=' + _this.orderId)
					}, '订单详情', '继续购物')
					break
				}
		},
		// 支付成功后跳转操作
		redirectHandler () {
			if (this.type == 1 && this.orderId) {
				this.$common.redirectTo('/pages/goods/payment/result?order_id=' + this.orderId)
			} else if (this.type == 2 && this.recharge) {
				uni.navigateBack({
					delta: 2
				})
			}
		}
	}
	
}	
</script>

<style>
.payment-method .cell-item-hd{
	min-width: 70upx;
}
.payment-method .cell-hd-icon{
	width: 70upx;
	height: 70upx;
}
.payment-method .cell-item-bd{
	border-left: 2upx solid #F0F0F0;
	padding-left: 30upx;
}
.payment-method .cell-bd-text{
	font-size: 28upx;
	color: #666;
}
.payment-method .address{
	font-size: 24upx;
	color: #999;
}	
</style>
