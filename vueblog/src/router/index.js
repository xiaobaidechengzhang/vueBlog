import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import UserArticle from '@/components/userArticle'
import Article from '@/components/article'
import WArticle from '@/components/wArticle'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
	  children:[
		  {path: '',component: UserArticle},
		  {path: 'detail/:id',component: Article,name:'Article'},
		  {path: 'writeArticle',component: WArticle}
	  ]
    },
	{
		path: '/login',
		name: 'Login',
		component: Login
	}
  ]
})
