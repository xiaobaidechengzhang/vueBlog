var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var db = require('../config/db');
var user = require('../config/user');

/* var connection = mysql.createConnection(db.mysql);
connection.connect(); */
var pool = mysql.createPool(db.mysql);


router.post('/reg',(req,res) => {
  let params = req.body;
  pool.getConnection((err,connection) => {
    connection.query(user.getUserByName,params.name,(err,result) => {
      if (err) throw err
      else {
        if(result.length != 0) {
          res.send({
            status: '5',
            msg: '该手机已经注册',
          });
          res.end();
        }
        else if (result.length == 0) {
          var sql = user.insertone;
          let userinfo = [params.name, params.phone, params.email, params.password];
          connection.query(sql, userinfo, (err,result) => {
            if(err) throw err
            else {
              res.send({
                params,
                status: 0,
                msg: '恭喜您，注册成功',
                result,
              });
              res.end();
            }
          })
        }
      }
    })
    connection.release();
  })
  /* connection.query(user.getUserByPhone,params.phone,(err,result) => {
    if (err) throw err
    else {
      if(result.length != 0) {
        res.send({
          status: '5',
          msg: '该手机已经注册',
        });
        res.end();
      }
      else if (result.length == 0) {
        var sql = user.insertone;
        let userinfo = [params.name, params.phone, params.email, params.password];
        connection.query(sql, userinfo, (err,result) => {
          if(err) throw err
          else {
            res.send({
              params,
              status: 0,
              msg: '恭喜您，注册成功',
              result,
            });
            res.end();
          }
        })
      }
    }
  })
  connection.end(); */
})

router.post('/login', (req, res) => {
  let params = req.body;
  pool.getConnection((err,connection) => {
    
  connection.query(user.getUserByName,params.name,(err,result) => {
    if (err) {throw err}
    else {
      if(result.length == 0) {
        res.send({
          status: '1',
          msg: '该用户尚未注册',
        });
        res.end();
      }
      else {
        let response = result[0];
        if(response.name == params.name && response.password == params.password) {
          res.send({
            status: '0',
            msg: '登录成功',
          });
          res.end();
        }else {
          res.send({
            status: '2',
            msg: '用户名或者密码有误',
          });
          res.end();
        }
          
      }
    }
  })
  connection.release()
  })
  /* connection.connect();
  connection.query(user.getUserByPhone,params.phone,(err,result) => {
    if (err) {throw err}
    else {
      if(result.length == 0) {
        res.send({
          status: '1',
          msg: '该手机尚未注册',
        });
        res.end();
      }
      else {
        let response = result[0];
        if(response.phone == params.phone && response.password == params.password) {
          res.send({
            status: '0',
            msg: '登录成功',
          });
          res.end();
        }else {
          res.send({
            status: '2',
            msg: '手机号或者密码有误',
          });
          res.end();
        }
          
      }
    }
  })
  connection.end(); */
})

router.get('/alluser',(req,res) => {
  pool.getConnection((err,connection) => {
    connection.query(user.queryAllUsers, (err,result) => {
    
      if(err) throw err
      else{
        if(result.length == 0){
          res.send({
            status: '2',
            msg: '尚无用户信息'
          });
          res.end();
        }
        else{
          res.json(result)
          res.end();
        }
      }
    })
    connection.release();
  })
  /* connection.query(user.queryAllUsers, (err,result) => {
    
    if(err) throw err
    else{
      if(result.length == 0){
        res.send({
          status: '2',
          msg: '尚无用户信息'
        });
        res.end();
      }
      else{
        res.json(result)
        res.end();
      }
    }
  })
  connection.end(); */
})
module.exports = router;
