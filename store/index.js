import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		config: {}, // 店铺配置信息
		orderTab: 0, // 选中的订单tab页
		redirectPage: '',
		uuid:'',//当前客户端
	},
    mutations: {
		config (state, payload) {
			state.config = payload
		},
		orderTab (state, tab) {
			state.orderTab = tab
		},
		redirect (state, payload) {
			state.redirectPage = payload.page
		}
	},
	actions: {

	},
	getters: {
		shopConfig: state => state.config,
		uuid: state	=>	state.uuid,
	}
})

export default store
