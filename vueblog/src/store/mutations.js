const ADD_USER_DATA = 'add_user_data'

export default {
	[ADD_USER_DATA](state, userData) {
		let userInfo = state.UserInfo;
		if(userInfo != userData) {
			userInfo.name = userData.name;
			userInfo.isLogin = userData.isLogin;
		}
	}
}