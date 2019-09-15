let bb = 0
var userdetail = {
    insertone:'insert into userdetail(id, name, article, des) values('+`${bb++}`+',?,?,?)',
    getUserAll:'select * from userdetail where name = ?',
	getDetail:'select * from userdetail where id= ? and name = ?',
    deleteArticle:'delete from userdetail where id = ? and name = ?',
    updateArticle:'update userdetail set article = ? ,des = ? where id = ? and name = ?'
};
module.exports = userdetail;
