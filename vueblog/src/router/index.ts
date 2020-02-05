/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
		children:[
		  {path: '', name: 'UserArticle', component: () => import(/* webpackChunkName: "UserArticle" */ '../components/userArticle.vue')},
		  {path: 'detail/:id', name: 'Article', component: () => import(/* webpackChunkName: "Article" */ '../components/article.vue')},
		  {path: 'writeArticle', name: 'WArticle', component: () => import(/* webpackChunkName: "WArticle" */ '../components/WArticle.vue')}
		]
  },
  {
    //path: '/about',
    //name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ '../views/login.vue')
	}
]

const router = new VueRouter({
  routes
})

export default router
