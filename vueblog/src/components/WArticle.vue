<template>
	<div style='margin: 20px;padding: 20px;'>
		<el-divider content-position="left" ><label style='font-size:20px;font-weight:bold'>博客标题</label></el-divider>
		<el-input placeholder="请输入内容" style='height:50px;' v-model='titleA' clearable></el-input>
		<el-divider content-position="left"><label style='font-size:18px;font-weight:bold'>Article</label></el-divider>
		<el-input type="textarea" v-model='articleA' :autosize="{ minRows: 10, maxRows: 100}" placeholder="请输入内容" ></el-input>
		<el-button type='info' style='float: right;margin:20px 10px' @click='cancelP'>取消</el-button>
		<el-button type='danger' style='float: right;margin:20px 10px' @click='publishA'>发表</el-button>
		<div id='content' class='hljs'></div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import marked from 'marked'
	import hjs from 'highlight.js'
	import javascript from 'highlight.js/lib/languages/javascript'
	import 'highlight.js/styles/github.css'
	export default {
		name: 'WArticle',
		data () {
			return {
				titleA: '',
				articleA:''
			}
		},
		computed: {
			...mapGetters('user',{
				userInfo:'getUserInfo'
			})
		},
		methods: {
			publishA() {
				this.$emit('toIndex1','1');
				let data = {
					name: this.userInfo.name,
					article: this.titleA,
					des: this.articleA
				}
				this.axios.post('http://localhost:3000/userdetail/title', data)
				  .then((res) => {
					
				    this.$router.push({path: '/'});
					this.$message('发表成功');
				  })
				  .catch((err) => {
				    console.log(err)
				  })
				 
			},
			cancelP() {
				
				this.$router.push({path: '/'});
				this.$message('取消发表');
			}
		}
		
	}
</script>
