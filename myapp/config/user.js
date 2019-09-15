let cc = 0
var user = {
    insertone:'insert into user(id, name, phone, email, password) values('+`${cc++}`+',?,?,?,?)',
    getUserByName:'select * from user where name = ? ',
    queryAllUsers:'select * from user',
    
};
module.exports = user;
