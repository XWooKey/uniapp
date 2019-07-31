<template>
	<view class="textarea bottom-cell-group" >
		<rich-text :nodes="data.params"></rich-text>
	</view>
</template>

<script>
import htmlParser from '@/common/html-parser'
export default {
	name: "jshoptextarea",
	props: {
		data:{
			// type: Object,
			required: true,
		}
	},
	created() {
		this.data.params = htmlParser(this.data.params)
	},
	onLoad() {
		
	},
	methods: {
		
	}
}
</script>

<style>
.textarea{
	width: 100%;
	background-color: #fff;
	padding: 10upx 26upx;
	/* height: 40upx; */
}
.textarea p img{
	width: 100% !important;
}
.textarea div{
	background-color: #000;
}
.textarea p {
	background-color: #000;
}
</style>
