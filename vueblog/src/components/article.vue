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
	</div>
</template>
<script>
	import marked from 'marked'
	import hjs from 'highlight.js'
	import javascript from 'highlight.js/lib/languages/javascript'
	import 'highlight.js/styles/github.css'
	export default {
		name: 'Article',
		components: {
			
		},
		data () {
			return {
				title:'',
				article: '',
				detail:{
					tt:'',
					aa:''
				}
			}
		},
		watch: {
			article(newValue, oldValue) {
				this.setContent();
			}
		},
		methods: {
			getArticle(index,nm) {
				let data = {
				  params: {
					id: index,
				    name: nm
				  }
				}
				console.log('getarticle')
				this.axios.get('http://localhost:3000/userdetail/detail', data)
				  .then(res => {
					  
				    this.detail.tt = res.data[0].article;
					this.detail.aa = res.data[0].des;
					$('#mainC').html(this.setMarked(res.data[0].des))
					$('pre').addClass('hljs');
					console.log('article: '+this.detail)
					
				  })
				  .catch(err => {
				    console.error(err)
				  })
			},
			updateArticle () {
				let data = {
				  params: {
					article: this.title,
					des: this.article,
					id: 11,
				    name: 'xiaobai'
				  }
				}
				console.log('updatearticle')
				this.axios.get('http://localhost:3000/userdetail/update', data)
				  .then(res => {
					this.$message('修改成功');
					
				  })
				  .catch(err => {
				    console.error(err)
				  })
			},
			setArticle () {
				$('#updateC').css('display','block');
				this.title = this.detail.tt;
				this.article = this.detail.aa;
			},
			setMarked(value) {
				marked.setOptions({
				  renderer: new marked.Renderer(),
				  highlight: function (code) {
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
			},
			setContent () {
				if(this.article){
					console.log('article')
					document.getElementById('rContent').innerHTML=this.setMarked(this.article)
					$('pre').addClass('hljs')
				}
				else{
					document.getElementById('rContent').innerHTML=''
				}	
			},
			confirmUpdate () {
				this.updateArticle();
				this.detail.tt = this.title;
				this.detail.aa = this.article;
				$('#mainC').html(this.setMarked(this.article));
				$('pre').addClass('hljs');
				$('#updateC').css('display','none');
				
			},
			cancelUpdate () {
				$('#updateC').css('display','none');
				this.$message('取消修改')
			}
		},
		mounted () {
			this.getArticle(this.$route.params.id,this.$route.params.name);
			//this.getArticle(11,'xiaobai');
		}
	}
</script>
<style>

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
		border: 1px solid gray;
	}
	
</style>
