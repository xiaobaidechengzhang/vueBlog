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

<script lang="ts">
	import http from '../utils/util'
	import { Component, Vue } from 'vue-property-decorator'
	import { State, namespace } from 'vuex-class'
	const userModule = namespace('user')
	
	@Component
	export default class WArticle extends Vue {
		private titleA: String = ''
		private articleA: String = ''
		
		//State
		@userModule.State userInfo: any
		
		//methods
		genID(length: number){
			//生成唯一id
			return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
		}
		publishA() {
			this.$emit('toIndex1','1');
			let onlyId = this.genID(20);
			console.log(this.userInfo.userId+':'+this.userInfo.userName);
			let data = {
				articleId:onlyId,
				articleUserId: this.userInfo.userId,
				articleUserName: this.userInfo.userName,
				articleTitle: this.titleA,
				articleContent: this.articleA,
				articleCreateTime: '2019-11-04-10:20',
				articleUpdateTime: '2019-11-04-10:20'
			}
			http.post('http://localhost:3000/userdetail/title', data)
			  .then((res) => {
				
			    this.$router.push({path: '/'});
				this.$message('发表成功');
			  })
			  .catch((err) => {
			    console.log(err)
			  })
			 
		}
		cancelP() {
			
			this.$router.push({path: '/'});
			this.$message('取消发表');
		}
	}
</script>
