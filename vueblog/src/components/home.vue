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
<script>
	import {mapGetters} from 'vuex'
	export default{
		name: 'Home',
		data () {
			return {
				activeIndex: '1'
			}
		},
		computed: {
			...mapGetters('user',{
				userInfo:'getUserInfo'
			})
		},
		methods: {
			handleSelect(key, keyPath) {
				if(key == 1) {
					this.$router.push({path: '/'})
				}
				else if(key == 4) {
					this.$router.push({path: '/writeArticle'})
				}
			},
			handleIndex (val) {
				console.log('handleindex');
				this.activeIndex = val;
			}
		},
		mounted () {
			console.log('home')
			if(this.userInfo.isLogin === false){
				this.$router.push({path: '/login'});
			}
			
		}
		
	}
</script>

