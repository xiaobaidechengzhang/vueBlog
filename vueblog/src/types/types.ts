//article.vue 用到的接口

export interface Article_SessionStorage {
	id: string;				//文章id
	userId: string;		//用户id
	userName: string;	//用户名
}

export interface Article_Detail {
	tt: string; //标题
	aa: string;	//文章内容
}

export interface Article_Get_Data_Params {
	articleId: string;			//文章id
	articleUserId: string;	//文章用户id
	articleUserName: string; //文章用户名字
}

export interface Article_Get_Data {
	params: Article_Get_Data_Params;
}

export interface Article_Update_Data_Params {
	articleTitle: string;
	articleContent: string;
	articleUpdateTime: string;
	articleId: string;
	articleUserId: string;
	articleUserName: string;
}

export interface Article_Update_Data {
	params: Article_Update_Data_Params;
}

export interface Comments_Data {
	ownerId: string;
	fromId: string;
	fromName: string;
}

//Comments.vue用到的接口
export interface Comments_Child_Data {
	commentId: string;  //子评论id
	fromId: string;			//评论者id
	fromName: string;		//评论者名字
	toId: string;				//被评论者id
	toName: string;			//被评论这者名字
	content: string;		//评论内容
	createTime: string;	//第一次评论时间
	updateTime: string; //更新评论时间
}

export interface Comments_Child_RealData {
	comment_id: string;  //子评论id
	from_id: string;			//评论者id
	from_name: string;		//评论者名字
	to_id: string;				//被评论者id
	to_name: string;			//被评论这者名字
	content: string;		//评论内容
	create_time: string;	//第一次评论时间
	update_time: string; //更新评论时间
}

export interface Comments_Reply_Data {
	index: number;
	id: string;
	fromId: string;
	fromName: string;
}

export interface Comments_Fth_Data {
	type: number
	ownerId: string;
	fromId: string;
	fromName: string;
	fromAvatar: string;
	content: string;
	createTime:string;
	updateTime: string;
}

export interface Comments_Fth_RealData {
	type: number;
	owner_id: string;
	from_id: string;
	from_name: string;
	from_avatar: string;
	content: string;
	create_time: string;
	update_time: string;
	reply: Array<object>;
}

//userArticle.vue用到的接口
export interface Query_Article_Data_Params {
	articleUserId: number | string;
	articleUserName: string;
}

export interface Query_Article_Data {
	params: Query_Article_Data_Params;
}

export interface Delete_Article_Data_Params {
	articleId: string | number;
	articleUserId: string | number;
	articleUserName: string;
}

export interface Delete_Article_Data {
	params: Delete_Article_Data_Params;
}

//login.vue用到的接口
export interface Login_Data {
	userName: string;
	userPassword: string;
}

export interface Reg_Data {
	userId: number | string;
	userName: string;
	userPhone: string;
	userEmail: string;
	userPassword: string;
}
