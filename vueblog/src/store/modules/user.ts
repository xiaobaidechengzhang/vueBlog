import { Commit } from 'vuex'

interface State_UserInfo {
	userId: string;
	userName: string;
}

interface State {
	userInfo: State_UserInfo;
}

const ADD_USER_DATA = 'add_user_data'

const user = {
	namespaced: true,
	state: {
		userInfo:{
			userId:'f5bwevorr2w0000',
			userName:'小白',
		}
	},
	mutations: {
		[ADD_USER_DATA](state: object | any, userData: object | any) {
			let userInfo = state.userInfo;
			if(userInfo != userData) {
				userInfo.userId = userData.userId;
				userInfo.userName = userData.userName;
			}
		}
	},
	actions: {
		addUserInfo(context: {commit: Commit, state: State}, userData: any){
			let userInfo = context.state.userInfo;
			if(userInfo === userData) {
				console.log('已经登录')
			}
			else {
				context.commit('add_user_data', userData);
			}
		}
	}
}

export default user
