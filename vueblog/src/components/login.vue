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
<script>
	import {mapActions} from 'vuex'
export default {
    name: 'Login',
    data () {
        return {
            activeName: 'first', 
			loginName: '',
			loginPassword: '',
			regName: '',
			regPhone: '',
			regEmail: '',
			regPassword1: '',
			regPassword2: ''
        }
    },
    methods: {
		...mapActions('user',[
			'addUserInfo'
		]),
        handleClick(tab,event){

        },
		login () {
			let data = {
				name: this.loginName,
				password: this.loginPassword
			}
			if(this.loginName && this.loginPassword){
				this.axios.post('http://localhost:3000/users/login', data)
				  .then((res) => {
					 console.log(res);
				    let msg = res.data.msg;
					if(msg === '登录成功') {
						this.$message('登录成功');
						let userData = {
							name:this.loginName,
							isLogin: true
						}
						this.addUserInfo(userData);
						this.$router.push({path:'/'})
					}
					else {
						this.$message(msg);
					}
						
				  })
				  .catch((err) => {
				    console.log(err)
				  })
			}
			else{
				this.$message('请正确输入用户名或者密码');
			}
			
		},
		register () {
			let data = {
			  name: this.regName,
			  phone: this.regPhone,
			  email: this.regEmail,
			  password: this.regPassword1
			}
			if(this.regEmail && this.regPhone &&this.regName &&this.regPassword1){
				if(this.regPassword1 != this.regPassword2){
					this.$message('两次密码必须相同')
				}
				else{
					this.axios.post('http://localhost:3000/users/reg', data)
					  .then((res) => {
						  this.$message('注册成功，请重新登录')
						this.$router.go({path: '/login'});
					    
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
    },
}
</script>
<style>
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
