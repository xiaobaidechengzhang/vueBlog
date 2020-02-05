import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'

declare module '*.vue' {
  
  export default Vue
}

declare module "vue/types/vue" {
	interface Vue {
		$router: VueRouter;//表示this有这个标识
		$route: Route;
		$Message: any;
		$Modal: any
	}
}
