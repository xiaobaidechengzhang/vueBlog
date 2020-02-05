<template>
	<div id='comments' >
		<textarea v-model="artComment"  placeholder="添加新评论"/>
		<button @click="sendComment" style="background-color:red;color: white;">发布</button>
		<div id='comments_header'>
			<span id="ver_line"></span>
			<span id="all_comments">全部评论</span>
		</div>
		<div v-for="(item, itemIndex) in commentsResult" :key=itemIndex>
			<div id="comments_info">
				<img id='comments_info_img' src="https://upload.jianshu.io/users/upload_avatars/16432686/c3000f68-2e6e-4e07-aaeb-06086912c116.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" />
				<div id="comments_info_name_date">
					<div id="info_name">{{item.from_name}}</div>
					<div id="info_date">{{item.update_time}}</div>
				</div>
			</div>
			<div id="comments_content">{{item.content}}</div>
			<div id="comments_content_like_reply">
				<i id='content_like' class="fa fa-thumbs-o-up" aria-hidden="true"> {{item.like_num > 0 ? item.like_num + '人赞' : '赞'}} </i>
				<i id='content_reply_button' @click="showReplyComments(itemIndex)" class="fa fa-comment-o" aria-hidden="true"> 回复 {{item.reply.length > 0 ? item.reply.length : ''}} </i>
				<div id="hor_line"></div>
			</div>
			<div >
				<div id="reply_info"  v-for="(reply, replyIndex) in item.reply" :key=replyIndex>
					<div id="reply_info_name_content">
						<span id="reply_info_name"><a href="" style="text-decoration: none;font-weight: bold;">{{reply.from_name}}:</a></span>
						<span id="reply_info_content"><a href="" style="text-decoration: none;">@{{reply.to_name}} </a>{{reply.content}}</span>
					</div>
					<div id="reply_date_and_button">
						<span id="reply_date">{{reply.update_time}}</span>
						<i id='reply_button' @click="showInputComment(itemIndex,item, reply)" class="fa fa-comment-o" aria-hidden="true" > 回复 </i>				
						<div id="hor_line"></div>
					</div>
					
				</div>
				
				<div id="add_comment" >
					<button  style="outline: none;border: 0;background-color: transparent;cursor: pointer;" @click="showInputComment(itemIndex,item)">
						<i class="fa fa-pencil" aria-hidden="true"></i>
						<span>添加新评论</span>
					</button>
					<div style="padding-top: 10px;" v-if="showItemId === item.id">
						<textarea  v-model="inputComment"/>
						<button @click='cancelAddComment'>取消</button>
						<button @click="queryAddComment">评论</button>
					</div>
					<div id="hor_line"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import http from '../utils/util'
	import { Component, Vue, Prop } from 'vue-property-decorator'
	
	import { Comments_Child_Data, Comments_Child_RealData, Comments_Reply_Data, Comments_Fth_Data, Comments_Fth_RealData } from '../types/types'
	
	@Component
	export default class Comments extends Vue {
		@Prop(Array) readonly commentsResult!: Array<any>//父评论数据
		@Prop(String) readonly artId!: string		//文章id
		@Prop(String) readonly userId!: string		//用户id
		@Prop(String) readonly userName!: string//用户名
		@Prop(Array) readonly showReplyArray!: Array<any> //是否显示子评论
		
		//data
		private replyData: Comments_Reply_Data = {
			index: 0,
			id: '',
			fromId: '',
			fromName: ''
		} 	//子评论数据
		private showItemId: string = '' //是否显示子评论input
		private inputComment: string = ''//子评论input输入框
		private artComment: string = ''	//父评论input输入框
		
		//methods
		cancelAddComment() {
				//取消发布子评论
				this.showItemId = ''
			}
		queryAddComment() {
				//添加子评论
				if(!this.inputComment){
					console.log('内容不能为空')
				}
				else{
					
					let data: Comments_Child_Data = {
						commentId:this.replyData.id,
						fromId: this.userId,
						fromName: this.userName,
						toId: this.replyData.fromId,
						toName: this.replyData.fromName,
						content: this.inputComment,
						createTime: '2019-11-03-16-50',
						updateTime: '2019-11-03-16-51'
						}
					let realData: Comments_Child_RealData = {
						comment_id:this.replyData.id,
						from_id: this.userId,
						from_name: this.userName,
						to_id: this.replyData.fromId,
						to_name: this.replyData.fromName,
						content: this.inputComment,
						create_time: '2019-11-03-16-50',
						update_time: '2019-11-03-16-51'
					}
					this.sendReply(data,realData);
					this.showItemId = ''
				}
			}
			
			showInputComment(itemIndex: number, item: any, reply: any) {
				console.log('show inpu comment')
				//reply为空，则回复父评论；否则回复子评论
				if(reply) {
					console.log('reply如下： '+reply)
					this.inputComment = '@' + reply.from_name;
					this.replyData = {
						index: itemIndex,
						id: item.id,
						fromId: reply.from_id,
						fromName: reply.from_name
					}
				}
				else {
					this.inputComment = '';
					this.replyData = {
						index: itemIndex,
						id: item.id,
						fromId: item.from_id,
						fromName: item.from_name
					}
				}
				this.showItemId = item.id;
				
				//this.queryAddComment(item,reply);
			}
			sendComment() {
				//添加父评论
				let data: Comments_Fth_Data = {
					type: 1,
					ownerId: this.artId,
					fromId: this.userId,
					fromName:this.userName,
					fromAvatar: 'https://tse1-mm.cn.bing.net/th?id=OET.94d08cacb9bd4c0796a8f76768982cfa&w=272&h=272&c=7&rs=1&o=5&pid=1.9',
					content:this.artComment,
					createTime:'2019-11-03-10:00',
					updateTime: '2019-11-03-10:10'
				}
				let realData: Comments_Fth_RealData = {
					type: 1,
					owner_id: this.artId,
					from_id: this.userId,
					from_name:this.userName,
					from_avatar: 'https://tse1-mm.cn.bing.net/th?id=OET.94d08cacb9bd4c0796a8f76768982cfa&w=272&h=272&c=7&rs=1&o=5&pid=1.9',
					content:this.artComment,
					create_time:'2019-11-03-10:00',
					update_time: '2019-11-03-10:10',
					reply:[]
				}
				http.post('http://localhost:3000/commentsInfo/fth',data)
					.then((res: object) => {
						this.commentsResult.push(realData);
						this.artComment = ''
					})
					.catch((err: any) => {
						console.log(err)
					})
				
			}
			sendReply(data: Comments_Child_Data, realData: Comments_Child_RealData){
				//发送子评论				
				http.post('http://localhost:3000/commentsReply/insertReply', data)
					.then((res: object) => {
						this.commentsResult[this.replyData.index].reply.push(realData);
					})
					.catch((err: any) => {
						console.log(err)
					})
			}
			showReplyComments(itemIndex: number) {
				console.log(this.showReplyArray[itemIndex]);
				this.showReplyArray[itemIndex] = true;
				console.log(this.showReplyArray)
			}
			/*
			updateReply() {
				let data = {
					content: '更新',
					updateTime: '2019-11-03-17-00',
					id: 4,
					commentId: '123',
					fromId: '123',
					toId: '123'
				}
				http.post('http://localhost:3000/commentsReply/updateReply', data)
					.then((res) => {
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			updateComment(){
				
				let data = {
					content: '更新',
					updateTime: '2019-11-03-17-10',
					id: 1,
					ownerId: '20191103',
					fromId: '20191102'
				}
				http.post('http://localhost:3000/commentsInfo/updateComments',data)
					.then((res) => {
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			
			addLike() {
				let data = {
					num:1,
					id: this.,
					ownerId: '20191103',
					fromId: '20191102'
				}
				http.post('http://localhost:3000/commentsInfo/addLike', data)
					.then((res) => {
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			}
			*/
	}
</script>

<style scoped lang="less">
	#comments{
		padding-left: 15px;
		background-color: #F9F9F9;
	}
	#comments_header{
		padding-left: 25px;
		padding-top: 10px;
		
	}
	#ver_line {
		border-left: solid 5px red;
		height: 20px;
		vertical-align: middle;
		display: inline-block;
		
	}
	#all_comments {
		padding-left: 15px;
		font-size: 20px;
		font-weight: bold;
		vertical-align: middle;
		display: inline-block;
		
	}
	#comments_info {
		padding-left: 25px;
		padding-top: 30px;
		display: flex;
	}
	#comments_info_img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	#comments_info_name_date {
		padding-left: 15px;
	}
	#info_name{
		font-size: 15px;
		font-weight: 200;
	}
	#info_date {
		font-size: 10px;
		padding-top: 10px;
		color: darkgray;
	}
	#comments_content {
		padding-left: 75px;
		padding-top: 20px;
		font-size: 17px;
		color: gray;
	}
	#comments_content_like_reply {
		padding-left: 75px;
		padding-top: 16px;
	}
	#content_reply_button {
		padding-left: 15px;
	}
	#content_reply_button:hover {
		color: red;
		cursor: pointer;
	}
	#hor_line {
		padding-left: 75px;
		padding-top: 25px;
		border-bottom: 1px dotted darkgray;
	}
	#reply_info {
		padding-left: 75px;
		padding-top: 20px;
	}
	
	#reply_info_content{
		padding-left: 10px;
	}
	#reply_date_and_button {
		padding-top: 10px;
	}
	#reply_date {
		color: darkgray;
	}
	#reply_button {
		padding-left: 10px;
	}
	#reply_button:hover {
		cursor:pointer;
		color: red;
	}
	#add_comment {
		padding-left: 75px;
		padding-top: 20px;
	}
	button {
		border: 0;
		outline: none;
		background-color: transparent;
		cursor: pointer;
	}
	textarea {
		height:100px;
		width:600px;
	}
	
</style>
