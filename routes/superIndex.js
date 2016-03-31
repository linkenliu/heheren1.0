var express = require('express');
var router = express.Router();
var postServices = require('../services/PostServices');
var async = require('async');
var config = require('../config/config');
var dateUtils = require('../utils/dateUtils.js');
var qiniu = require('../utils/qiniu');
var moment = require('moment');
var qiniutoken = qiniu.upToken('heheren');
/**
 *管理后台入口 
 */
router.get('/',function(req,res){
	res.render('admin/index');
});
/**
 *管理后台       帖子列表 
 */
router.get('/queryPostList',function(req,res){
	var postChoose = req.query.postChoose;
	var keyWord = req.query.keyWord;
	var params = {
		postChoose:postChoose,
		keyWord:keyWord
	};
	postServices.queryPostList(params,function(err,list){
		async.map(list, function(item, callback) {
				item.createDate = dateUtils.formatBirthday(item.createDate);
				callback(null, item);
			}, function(err, results) {
				res.render('admin/post',{list:list});	
		});
	});
});
/**
 *管理后台          addUI 
 */
router.get('/addPostUI',function(req,res){
	postServices.queryFirst({},function(err,list){
		res.render('admin/addPost',{firstList:list,qntoken:qiniutoken});	
	});
});

/**
 *管理后台  addPost
 */
router.post('/addPost',function(req,res){
	var params = {
		name:req.body.name,
		type:req.body.type,
		firstName : req.body.firstName,
		secondaryType:req.body.secondaryType,
		secondaryName:req.body.secondaryName,
		isBanner:req.body.isBanner,
		isRecommend:req.body.isRecommend,
		banner:req.body.banner,
		picture:req.body.picture,
		details:req.body.details,
		summary:req.body.summary
	}
	postServices.addPost(params,function(err,obj){
		res.redirect('/superAdmin/queryPostList');
	});
});
/**
 *管理后台     查询二级 
 */
router.post('/querySecondary',function(req,res){
	var id = req.body.id;
	postServices.querySecondary({id:id},function(err,list){
		res.json(list);
	});
});

/**
 *管理后台     updateUI 
 */
router.get('/updateUI',function(req,res){
	var pictureArr = "";
	async.parallel([
		function(callback){
			postServices.findOnePost({id:req.query.id},function(err,obj){
				if(obj.picture){
					pictureArr = obj.picture.split(",");
				}
				callback(null,obj);
			});
		},
		function(callback){
			postServices.queryFirst({},function(err,list){
				callback(null,list);
			});	
		},function(callback){
			postServices.querySecondary({id:req.query.type},function(err,list){
				console.log("************"+JSON.stringify(list)+"-----------"+req.query.type)
				callback(null,list);
			});
		}
	], function(err, results){
		res.render('admin/updatePost',{post:results[0],qntoken:qiniutoken,pictureArr:pictureArr,firstList:results[1],secondaryList:results[2]});
	});	
});
/**
 *管理后台         updatePost 
 */
router.post('/updatePost',function(req,res){
	var params = {
		name:req.body.name,
		type:req.body.type,
		firstName:req.body.firstName,
		secondaryType:req.body.secondaryType,
		secondaryName:req.body.secondaryName,
		isBanner:req.body.isBanner,
		isRecommend:req.body.isRecommend,
		banner:req.body.banner,
		picture:req.body.picture,
		details:req.body.details,
		summary:req.body.summary,
		updateDate:moment().format("YYYY-MM-DD HH:mm:ss")
	}
	postServices.updatePost({id:req.body.id},params,function(err,obj){
		res.redirect("/superAdmin/queryPostList");
	});
});

/**
 * 管理后台         删除帖子
 */
router.get('/deletePost',function(req,res){
	var id = req.query.id;
	postServices.deletePost({id:id},function(err,obj){
		res.redirect("/superAdmin/queryPostList");
	});
});

/**
 * 删除七牛服务器文件
 */
router.post('/image/delete',function(req, res){
	qiniu.delImage("heheren",req.body.qiniuKey, function(err){
		if(err){
			res.json(err.message);
		} else {
			res.send("success");
		}
	});
});
module.exports = router;
