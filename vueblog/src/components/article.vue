<template>
	<div style='margin: 20px;padding: 20px;'>
		<div>
			<el-button type='danger' icon='el-icon-edit' style='float: right;margin:0px 10px 20px' @click='setArticle'></el-button>
			<span style='font-size:15px;float: right;margin:0px 10px 20px' >2019-09-12</span>
			<h2 style='text-align: center;'><a href="#" style='font-size: 30px;'>{{detail.tt}}</a></h2>
			<div id='mainC'></div>
			
		</div>
		<div style='margin:20px;padding:20px;' id='updateC'>
			<el-divider content-position='left' style='font-size:20px;font-weight:bold'>标题</el-divider>
			<el-input placeholder='标题' v-model='title'></el-input>
			<el-divider content-position='left' style='font-size:18px;font-weight:bold'>Article</el-divider>
			<textarea placeholder="请输入内容" 
					style='width:48%;height:300px;font-size: 20px;'
					v-model='article'
					 ></textarea>
			<div id='rContent' style='width:48%;height:300px;font-size:20px;border:1px solid gray;float:right;'>请输入内容</div>
			<el-button type='info'  @click='cancelUpdate' style='float: right;margin:20px 10px;'>取消</el-button>
			<el-button type='danger'  @click='confirmUpdate' style='float: right;margin:20px 10px'>修改</el-button>
		</div>
		<Comments :commentsResult="commentsData"
				  :artId="articleId"
				  :userId="userId"
				  :userName="userName"
				  :showReplyArray='showReplyArray'
				  id='comments'></Comments>
	</div>
</template>

<script lang="ts">
	import Comments from './comments.vue'
	import marked from 'marked'
	import hjs from 'highlight.js'
	import javascript from 'highlight.js/lib/languages/javascript'
	import 'highlight.js/styles/github.css'
	import http from '../utils/util'
	
	import { Component, Vue, Watch } from 'vue-property-decorator'
	
	import { Article_SessionStorage, Article_Detail, Article_Get_Data, Article_Update_Data, Comments_Data } from '../types/types'
	
	@Component ({
		components: {
			Comments
		}
	})
	export default class Article extends Vue {
		
		//data
		private title: string = "";
		private article: string = "";
		private detail: Article_Detail = {
			tt: "",
			aa: ""
		}
		private articleId: string = "";//文章id
		private userId: string = "";	//用户id
		private userName: string = ""; //用户名
		private commentsData: Array<object> = [];  //文章评论
		private showReplyArray: Array<any> = [];
		
		//watch
		@Watch('article')
		onArticleChange(newValue: string, oldValue: string) {
			this.setContent()
		}
		//methods
		getArticle(artId: string, userId: string, userName: string) {
			let data: Article_Get_Data = {
			  params: {
				articleId: artId,
				articleUserId: userId,
				articleUserName: userName
			  }
			}
			console.log('getarticle')
			//设置axios拦截器，进行token验证
		
			http.get('http://localhost:3000/userdetail/detail', data)
			  .then(res => {
				  
			  this.detail.tt = res.data[0].article_title;
				this.detail.aa = res.data[0].article_content;
				$('#mainC').html(this.setMarked(res.data[0].article_content))
				$('pre,strong,em,del,blockquote,h1,table,ul,ol,dl').addClass('hljs');
				console.log('article: '+this.detail)
				this.getAllComments();
			  })
			  .catch(err => {
			    console.error(err)
			  })
		}
		updateArticle () {
			let data: Article_Update_Data = {
			  params: {
				articleTitle: this.title,
				articleContent: this.article,
				articleUpdateTime:'2019-11-04-10:14',
				articleId: this.articleId,
				articleUserId: this.userId,
			  articleUserName: this.userName
			  }
			}
			console.log('updatearticle')
			http.get('http://localhost:3000/userdetail/update', data)
			  .then((res: object) => {
				this.$message('修改成功');
				
			  })
			  .catch((err: any) => {
			    console.error(err)
			  })
		}
		setArticle () {
			$('#updateC').css('display','block');
			this.title = this.detail.tt;
			this.article = this.detail.aa;
		}
		setMarked (value: string): any {
			marked.setOptions({
			  renderer: new marked.Renderer(),
			  highlight: function (code: any) {
			    return hjs.highlightAuto(code).value
			  },
			  pedantic: false,
			  gfm: true,
			  tables: true,
			  breaks: false,
			  sanitize: false,
			  smartLists: true,
			  smartypants: false,
			  xhtml: false
			})
			
			return marked(value)
		}
		setContent () {
			if(this.article){
				console.log('article')
				const markValue: any = this.setMarked(this.article)
				
				if (markValue != null) {
					document.getElementById('rContent')!.innerHTML = markValue
				}
				
				//console.log(this.setMarked(this.article))
				$('pre,strong,em,del,blockquote,h1,table,ul,ol,dl').addClass('hljs')
			}
			else{
				document.getElementById('rContent')!.innerHTML=''
			}	
		}
		confirmUpdate () {
			this.updateArticle();
			this.detail.tt = this.title;
			this.detail.aa = this.article;
			const markValue: any = this.setMarked(this.article);
			
			if (markValue != null) {
				$('#mainC')!.html(markValue);
			}
			
			$('pre,strong,em,del,blockquote,h1,table,ul,ol,dl').addClass('hljs');
			$('#updateC').css('display','none');
			
		}
		cancelUpdate () {
			$('#updateC').css('display','none');
			this.$message('取消修改')
		}
		getAllComments() {
			//获取全部评论
			let data: Comments_Data = {
				ownerId: this.articleId,
				fromId: this.userId,
				fromName: this.userName
			}
			console.log(data)
			http.post('http://localhost:3000/commentsInfo/getComments', data)
				.then((res: any) => {
					//this.commentsData = res.data;
					console.log('res如下：'+ typeof res.data)
					
					for(let i =0;i<res.data.length;i++) {
						let data_reply = {
							id: res.data[i].id
						}
						http.post('http://localhost:3000/commentsReply/getReply', data_reply)
							.then((res_reply: any) => {
								//console.log(res_reply)
								this.$set(res.data[i], 'reply', res_reply.data)
							})
							.catch((err_reply: any) => {
								console.log(err_reply)
							})
					}
					console.log(res.data)
					for(let i=0;i<res.data.length;i++) {
						this.showReplyArray.push(false)
					}
					this.commentsData = res.data;
				})
				.catch((err: any) => {
					console.log(err)
				})
			
		}
		
		//处理刷新事件
		beforeUnloadFunc (e: any) {
			console.log('article before unload')
			if(window.sessionStorage.getItem('articleUserInfo') != null) {
				let userInfo: Article_SessionStorage = JSON.parse(sessionStorage.getItem('articleUserInfo')!)
				if(userInfo.id != this.$route.params.id) {
					//判断文章是否发生变化
					console.log('differ')
					let articleUserInfo: Article_SessionStorage = {
						id: this.$route.params.id,
						userId: this.$route.params.userId,
						userName: this.$route.params.userName
					}
					sessionStorage.setItem('articleUserInfo', JSON.stringify(articleUserInfo))
				}
			}
			else {
				console.log('no')
				let articleUserInfo: Article_SessionStorage = {
					id: this.$route.params.id,
					userId: this.$route.params.userId,
					userName: this.$route.params.userName
				}
				//存储对象要进行序列化
				console.log(JSON.stringify(articleUserInfo))
				sessionStorage.setItem('articleUserInfo', JSON.stringify(articleUserInfo))
			}
		}

		created () {
			console.log('article created'+ '  '+this.$route.params.userName)
			window.addEventListener('beforeunload', e => this.beforeUnloadFunc(e))
		}
		
		

		destroyed () {
			console.log('article destroy'+ '  '+this.$route.params.userName)
			window.removeEventListener('beforeunload', e => this.beforeUnloadFunc(e))

		}
		
		
		
		mounted () {

			if(this.$route.params.userId === undefined && this.$route.params.userName === undefined) {
				if(sessionStorage.getItem('articleUserInfo') != null) {
					//反序列化
					let articleUserInfo: Article_SessionStorage = JSON.parse(sessionStorage.getItem('articleUserInfo')!)
					console.log('mount articleuserinfo '+ '     '+articleUserInfo.id)
					 this.articleId = articleUserInfo.id;
					 this.userId = articleUserInfo.userId;
					 this.userName = articleUserInfo.userName;
					 this.getArticle(articleUserInfo.id, articleUserInfo.userId, articleUserInfo.userName)
				}
				console.log('mountmount')
			}
			else {
				this.articleId = this.$route.params.id;
				this.userId = this.$route.params.userId;
				this.userName = this.$route.params.userName;
				this.getArticle(this.$route.params.id,this.$route.params.userId, this.$route.params.userName);
			}		
		}
	}
</script>

<style scoped lang="less">

	#editM{
		display:none;
	}
	#rContent{
		overflow: auto;
	}
	#updateC{
		position: absolute;
		z-index: 1;
		left: 15%;
		top:0;
		width:70%;
		box-shadow: 0 6px 12px 6px rgba(0, 0, 0, 0.5);
		background-color:white;
		display: none;
	}
	#mainC {
		font-size:20px;
		width:100%;
		margin-top: 20px;
	}
	
	#comments {
		padding-top: 50px;
	}
	
</style>
