<template>
	<div>
		<el-row>
			<el-col :span='24'>
				<div v-for="(item,index) in results" :key=item.id class='singleArt'
						>
					<el-button id='deleteA' type='info' style='float: right;'
							@click='deleteArticle(item.id,item.name)'>删除</el-button>
					<h2><router-link :to="{name:'Article',params:{id:item.id,name:item.name}}">{{item.article}}</router-link></h2>
					<p id='des'><router-link :to="{name:'Article',params:{id:item.id,name:item.name}}">{{item.des}}</router-link></p>
					<span style='float: right;font-size:15px'>2019-09-12</span>
				</div>
			</el-col>
			<el-col :span='24' v-show='!results.length' style='margin-top: 20px;text-align: center;'>尚无文章发表</el-col>
		</el-row>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'UserArticle',
		data () {
			return {
				results:[]
			}
		},
		computed: {
			...mapGetters('user',{
				userInfo: 'getUserInfo'
			})
		},
		methods: {
			
			queryArticle () {
			  let data = {
			    params: {
			      name: this.userInfo.name
			    }
			  }
			  
			  this.axios.get('http://localhost:3000/userdetail/info', data)
			    .then(res => {
					if(res.data.length){
						this.results = res.data.reverse();
					}
					else{
						if(this.userInfo.isLogin){
							this.$message('尚无文章发表')
						}
						
					}
					
			    })
			    .catch(err => {
			      console.error(err)
			    })
			},
			deleteArticle(id,name) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
					}).then(() => {
						this.delete(id,name);
						
					}).catch(() => {
						this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			delete(artId,userName) {
				let data = {
					params: {
						id: artId,
						name: userName
					}
				}
				this.axios.get('http://localhost:3000/userdetail/delete', data)
					.then((res) => {
						let item = this.results.find(item => item.id === artId);
						this.results.splice(item,1);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).
					catch((err) => {
						console.log(err);
					})
			}
		},
		mounted () {
			console.log('mount home : '+this.userInfo.name)
			this.queryArticle();
		}
	}
</script>
<style>
	.singleArt {
		margin:20px;
		padding: 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}
	#deleteA{
		display:none;
	}
	.singleArt:hover #deleteA{
		display:block;
	}
	#des{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
</style>
