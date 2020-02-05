<template>
	<div>
		<el-row>
			<el-col :span='24'>
				<div v-for="(item,index) in results" :key=item.article_id class='singleArt'
						>
					<el-button id='deleteA' type='info' style='float: right;'
							@click='deleteArticle(item.article_id, item.article_user_id, item.article_user_name)'>删除</el-button>
					<h2><router-link :to="{name:'Article',params:{id:item.article_id,userId:item.article_user_id,userName:item.article_user_name}}">{{item.article_title}}</router-link></h2>
					<p id='des'><router-link :to="{name:'Article',params:{id:item.article_id,userId:item.article_user_id, userName:item.article_user_name}}">{{item.article_content}}</router-link></p>
					<span style='float: right;font-size:15px'>{{item.article_update_tiem}}</span>
				</div>
			</el-col>
			<el-col :span='24' v-show='!results.length' style='margin-top: 20px;text-align: center;'>尚无文章发表</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
	import http from '../utils/util'
	import { State, namespace } from 'vuex-class'
	const userModule = namespace('user')
	import { Component, Vue } from 'vue-property-decorator'
	import { Query_Article_Data, Delete_Article_Data } from '../types/types'
	@Component
	export default class UserArticle extends Vue {
		private results:Array<object> = []
		
		@userModule.State userInfo: any
		
		//mehtods
		queryArticle () {
		  
		  let data: Query_Article_Data = {
		    params: {
		      articleUserId: this.userInfo.userId,
					articleUserName: this.userInfo.userName
		    }
		  }			  
		  http.get('http://localhost:3000/userdetail/info', data)
		    .then((res: any) => {
		    	console.log('query: '+res)
				if(res.data.length){
					this.results = res.data.reverse();
				}
				else{
					this.$message('尚无文章发表')
				
				}
				
		    })
		    .catch((err: any) => {
		      console.error(err)
		
		    })
		}
		deleteArticle(artId: string, userId: string, userName: string) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
					this.delete(artId,userId,userName);
					
				}).catch(() => {
					this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		}
		delete(artId: string | number, userId: string, userName: string) {
			let data: Delete_Article_Data = {
				params: {
					articleId: artId,
					articleUserId: userId,
					articleUserName: userName
				}
			}
			http.get('http://localhost:3000/userdetail/delete', data)
				.then((res: any) => {
					let index: number = this.results.findIndex((item: any) => item.article_id === artId);
					console.log(index);
					this.results.splice(index,1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).
				catch((err: any) => {
					console.log(err);
				})
		}
		
		mounted () {
			//console.log('mount home : '+this.userInfo.userName);
			this.queryArticle();
		}
	}
</script>

<style scoped lang="less">
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
