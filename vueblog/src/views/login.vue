<template>
	<div class='login'>
	    <div style='text-align:center'>
	        <h1 style='margin:0;padding:0;margin-bottom:5px'>小白的博客</h1>
	        <h3 style='margin:0;padding:0;margin-bottom:10px;'>github.com/xiaobaidechengzhang</h3>
	    </div>
	    <div >
	        <el-row type='flex' justify='center'>
	        <el-col :span='10' class='content'>
	            <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:20px;">
	                <el-tab-pane label="登录" name="first">
	                    <input type='text' placeholder='请输入用户名' class='no_border' v-model='loginName'>
	                    <input type='password' placeholder='请输入密码' class='no_border' v-model='loginPassword'>
	                    <el-button type='text' style='margin-top:10px'>手机号登录</el-button>
	                    <el-button type='text' style='float:right;color:gray;margin-top:10px;'>忘记密码?</el-button>
	                    <el-button type='primary' style='width:100%;margin-top:15px;' @click='login'>登录</el-button>
	                    <el-button type='text' style='color:gray;margin-left:15px'>社交账号登录</el-button>
	                    <el-button type='text' style='float:right;margin-right:15px'>微信   QQ    微博</el-button>
						<div><el-button type='text'>隐私协议</el-button></div>
					</el-tab-pane>
	                <el-tab-pane label="注册" name="second">
	                    <input type='text' placeholder='请输入用户名' class='no_border' v-model='regName'>
	                    <input type='phone' placeholder='请输入电话' class='no_border' v-model='regPhone'>
	                    <input type='email' placeholder='请输入邮箱' class='no_border' v-model='regEmail'>
	                    <input type='password' placeholder='请输入密码' class='no_border' v-model='regPassword1'>
	                    <input type='password' placeholder='请再次输入密码' class='no_border' v-model='regPassword2'>                    
	                    <el-button type='primary' style='width:100%;margin-top:15px' @click='register'>注册</el-button>
	                </el-tab-pane>
	            </el-tabs>               
	        </el-col>
	    </el-row>
	    </div>    
	</div>
</template>

<script lang="ts">
	import http from '../utils/util'
	import { Component, Vue } from 'vue-property-decorator'
	import { Action, namespace } from 'vuex-class'
	const userModule = namespace('user')
	import { Login_Data, Reg_Data } from '../types/types'
@Component
export default class Login extends Vue {
	private activeName: string = 'first' 
	private loginName: string = ''
	private loginPassword: string = ''
	private regName: string = ''
	private regPhone: string = ''
	private regEmail: string = ''
	private regPassword1: string = ''
	private regPassword2: string = ''
	
	//Action
	@userModule.Action addUserInfo: any
	//methods
	// handleClick (tab,event) {
	
	// }
	genID (length: number): string {
		//生成唯一id
		return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
	}
	login () {
		let data: Login_Data = {
			userName: this.loginName,
			userPassword: this.loginPassword
		}
		if(this.loginName && this.loginPassword){
			http.post('http://localhost:3000/users/login', data)
			  .then((res) => {
				 console.log('登录： '+res);
			    let msg = res.data.msg;
				let result = res.data.result;
				if(msg === '登录成功') {
					this.$message('登录成功');
					let userData = {
						userId: result.userId,
						userName:result.userName,
					}
					this.addUserInfo(userData);
					this.$router.push({path:'/'})
				}
				else {
					this.$message(msg);
				}
					
			  })
			  .catch((err) => {
			    console.log('错误： '+err)
			  })
		}
		else{
			this.$message('请正确输入用户名或者密码');
		}
		
	}
	register () {
		let onlyId: string = this.genID(10);
		let data: Reg_Data = {
		  userId:onlyId,
		  userName: this.regName,
		  userPhone: this.regPhone,
		  userEmail: this.regEmail,
		  userPassword: this.regPassword1
		}
		if(this.regEmail && this.regPhone &&this.regName &&this.regPassword1){
			if(this.regPassword1 != this.regPassword2){
				this.$message('两次密码必须相同')
			}
			else{
				http.post('http://localhost:3000/users/reg', data)
				  .then((res) => {
					  this.$message('注册成功，请重新登录')
					this.$router.push({path: '/login'});
				    
				  })
				  .catch((err) => {
				    console.log(err)
				  })
			}
		}
		else{
			this.$message('以上信息必须全部填写哦')
		}
		
	}
	
	mounted() {
		console.log('login')
	}
}
</script>

<style scoped lang="less">
	.login{
	    background-image:url('http://img.netbian.com/file/2016/0515/ad826d74aa076f86ffe9795b7f5511e5.gif');
	    background-size: 100% 100%;
	    background-repeat: no-repeat;
	    background-attachment:fixed;
	}
	.content{
	    background-color:white;
	}
	.no_border{
	    border:none;
	    outline:none;
	    height:60px;
	    width:100%;
	    margin:0;
	    padding:0;
	    border-bottom:1px solid gray;
	    font-size:16px;
	    
	}
	.el-tabs__item{
	    padding:0 20px;
	     height:40px;
	    -webkit-box-sizing:border-box;
	    box-sizing:border-box;
	    line-height:40px;
	    display:inline-block;
	    list-style:none;
	    font-size:22px !important;//重写字体大小
	    font-weight:500;
	    color:#303133;
	    position:relative
	}  
</style>
