export default {
	addUserInfo({commit, state}, userData){
		let userInfo = state.UserInfo;
		if(userInfo === userData) {
			console.log('已经登录')
		}
		else {
			commit('add_user_data', userData);
		}
	}
}