<template>
  <div style='margin:20px;padding: 20px;'>
  	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
  			>
  		<el-menu-item index="1">
  			博客
  		</el-menu-item>
  		<el-submenu index="2" style='float:right' disabled>
  			<template slot="title">个人中心</template>
  			<el-menu-item index="2-1">选项1</el-menu-item>
  			<el-menu-item index="2-2">选项2</el-menu-item>
  			<el-menu-item index="2-3">选项3</el-menu-item>
  				<el-submenu index="2-4">
  					<template slot="title">选项4</template>
  					<el-menu-item index="2-4-1">选项1</el-menu-item>
  					<el-menu-item index="2-4-2">选项2</el-menu-item>
  					<el-menu-item index="2-4-3">选项3</el-menu-item>
  				</el-submenu>
  		</el-submenu>
  		<el-menu-item index="4" style='float: right;'>
  			<el-button type='danger'>
  				写博客
  			</el-button>
  		</el-menu-item>
  	</el-menu>
  	
  	<router-view class='home' @toIndex1='handleIndex'></router-view>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Vue } from 'vue-property-decorator'

import { State, namespace } from 'vuex-class'
const userModule = namespace('user')

@Component
export default class Home extends Vue {
  private activeIndex: String = '1';
  
  @userModule.State userInfo: any
  
  //methods
  handleSelect(key: number, keyPath: any) {
  	if(key == 1) {
  		console.log('key: '+key)
  		this.$router.push({path: '/'})
  	}
  	else if(key == 4) {
  		this.$router.push({path: '/writeArticle'})
  	}
  }
  
  handleIndex (val: string) {
  	console.log('handleindex');
  	this.activeIndex = val;
  }
  
  mounted () {
  	console.log('home')
  	/*
  	if(this.userInfo.isLogin === false){
  		this.$router.push({path: '/login'});
  	}
  	*/
  	
  }
}
</script>
