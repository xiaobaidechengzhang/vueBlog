var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var db = require('../config/db');
var userdetail = require('../config/userDetail');
//var connection = mysql.createConnection(db.mysql);
var pool1 = mysql.createPool(db.mysql);
//connection.connect();

router.post('/title',(req,res) => {
    let params=req.body;
    let userA=[params.name,params.article,params.des];
    pool1.getConnection((err,connection) => {
        if(err)
        {
            reject (err)
        }
        connection.query(userdetail.insertone, userA,(err1,result) => {
            if(err1){
                throw err1
            }
            else{
                res.send({
                    status: '0',
                    msg: '成功',
                });
                res.end();
            }
        })
        connection.release();
    })
    /* connection.query(userDetail.insertone, userA, (err,result) => {
        if(err) throw err
        else {
            res.send({
                params,
                status:'0',
                msg: '发表成功',
                result
            });
            res.end();
        }
    })
    connection.end(); */
})

router.get('/info', (req,res) => {
    let pp = req.query.name;
    pool1.getConnection((err,connection) => {
        if(err){
            reject (err)
        }
        console.log(userdetail.getUserAll+" name:"+pp)
        connection.query(userdetail.getUserAll,[pp],(err1,result) => {
            if(err1)
            {
                throw err1
            }
            else{
                if(result.length == 0){
                    res.send({
                        status: '4',
                        msg: '尚无文章发表'
                    });
                    res.end();
                }
                else{
                    res.json(result);
                    res.end();
                }
            }
        })
		connection.release();
    })
    /* connection.query(userDetail.queryAllDetail, name, (err,result) => {
        if(err) throw err
        else {
            if(result.length == 0){
                res.send({
                    status: '2',
                    msg: '尚无文章发表'
                });
                res.end();
            }
            else {
                res.json(result);
                res.end();
            }
        }
    })
    connection.end(); */
})
//删除文章
router.get('/delete',(req,res) => {
    let params = req.query;
    let data = [params.id,params.name];
    console.log(params);
    pool1.getConnection((err,connection) => {
        if(err) {
            reject(err)
        }
        connection.query(userdetail.deleteArticle,data,(err1,result) => {
            if(err1) {
                throw err1
            }
            else{
                res.send({
                    status: '2',
                    msg: '删除成功',
                    result
                })
            }
        })
		connection.release();
    })
})

router.get('/update',(req,res) => {
    let params = req.query;
    //一一对应
    let data = [params.article,params.des,params.id,params.name];
    console.log(params);
    pool1.getConnection((err,connection) => {
        if(err){
            reject (err)
        }
        connection.query(userdetail.updateArticle,data,(err1,result) => {
            if(err1){
                throw err1
            }
            else{
                if(result.length != 0){
                    res.send({
                        status: '5',
                        msg: '更新成功',
                        result
                    })
                }
            }
        })
		connection.release();
    })
})

router.get('/detail',(req,res) => {
	let params = req.query;
	let data = [params.id,params.name];
	console.log(params);
	pool1.getConnection((err,connection) => {
	    if(err){
	        reject (err)
	    }
	    connection.query(userdetail.getDetail,data,(err1,result) => {
	        if(err1){
	            throw err1
	        }
	        else{
	            if(result.length != 0){
					console.log('ssssss');
	                res.json(result);
					res.end();
	            }
	        }
	    })
		connection.release();
	})
})
module.exports = router;
