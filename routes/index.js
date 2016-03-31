var express = require('express');
var router = express.Router();
var postServices = require('../services/PostServices');
var async = require('async');
var config = require('../config/config');
var dateUtils = require('../utils/dateUtils.js');
/* GET home page. */
router.get('/', function(req, res) {
	async.parallel([
		/**
		 * 查询首页帖子
		 * @param {Object} callback
		 */
		function(callback) {
			var params = {
				type: "!=4",
				limit:10,
				pageIndex:0
			};
			postServices.getPost(params, function(err, list) {
				async.map(list, function(item, callback) {
					item.banner = config.qiniu.download_website + item.banner;
					//item.details = item.details.length>50?item.details.substring(0,50)+"...":item.details;
					item.summary = item.summary.length > 50 ? item.summary.substring(0, 50) + "..." : item.summary;
					item.createDate = dateUtils.formatBirthday(item.createDate);
					callback(null, item);
				}, function(err, results) {
					callback(null, results);
				});
			});
		},
		/**
		 * 查询推荐帖子
		 * @param {Object} callback
		 */
		function(callback) {
			var params = {
				isRecommend: "=1",
				type: "!=4",
				limit: 10
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		/**
		 * 查询阅读数从高到低的帖子
		 * @param {Object} callback
		 */
		function(callback) {
			var params = {
				readerCount: true,
				type: "!=4",
				limit: 3
			};
			postServices.getPost(params, function(err, list) {
				async.map(list, function(item, callback) {
					item.banner = config.qiniu.download_website + item.banner;
					callback(null, item);
				}, function(err, results) {
					callback(null, results);
				});
			});
		},
		/**
		 * 查询广告帖子
		 * @param {Object} callback
		 */
		function(callback) {
			var params = {
				isBanner: "=1",
				type: "!=4",
				limit: 6
			};
			postServices.getPost(params, function(err, list) {
				async.map(list, function(item, callback) {
					item.banner = config.qiniu.download_website + item.banner;
					callback(null, item);
				}, function(err, results) {
					callback(null, results);
				});
			});
		}
	], function(err, results){
		console.log(JSON.stringify(results[3]))
		res.render('index', {
			list: results[0],recommendList:results[1],readerList:results[2],bannerList:results[3]
		});
	});
});
router.get('/getMorePost', function(req, res) {
	var params = {
		type: "!=4",
		limit: req.query.limit ? req.query.limit : 3,
		pageIndex: req.query.pageIndex ? (req.query.pageIndex-1)*req.query.limit : 0
	};
	postServices.getPost(params, function(err, list) {


		list.forEach(function(item, index) {
			item.createDate = dateUtils.formatBirthday(item.createDate);
			item.summary = item.summary.length > 50 ? item.summary.substring(0, 50) + "..." : item.summary;
			item.banner = config.qiniu.download_website + item.banner;
		});
		res.render('morePost', {
			list: list
		});
	});
});
/**
 *帖子详情	 
 */
router.get('/postDetails/:id/:type', function(req, res) {
	async.parallel([
		function(callback) {
			var params = {
				type: "!=4",
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			postServices.getPostById({
				id: req.params.id
			}, function(err, postObj) {
				postObj.setDataValue('createDate', dateUtils.formatBirthday(postObj.createDate));
				callback(null, postObj)
			});
		},
		function(callback) {
			var params = {
				type: "=" + req.params.type,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				readerCount: true,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				id:req.params.id
			};
			postServices.updatePostReaderCount(params, function(err, obj) {
				callback(null, obj);
			});
		}
	], function(err, results) {
		res.render('post_details', {
			postObj: results[1],
			newList: results[0],
			relatedList: results[2],
			readerList: results[3]
		});
	});
});
router.get('/catalog/postDetails/:id/:type', function(req, res) {
	async.parallel([
		function(callback) {
			var params = {
				type: "!=4",
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			postServices.getPostById({
				id: req.params.id
			}, function(err, postObj) {
				postObj.setDataValue('createDate', dateUtils.formatBirthday(postObj.createDate));
				callback(null, postObj)
			});
		},
		function(callback) {
			var params = {
				type: "=" + req.params.type,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				readerCount: true,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				id:req.params.id
			};
			postServices.updatePostReaderCount(params, function(err, obj) {
				callback(null, obj);
			});
		}
	], function(err, results) {
		res.render('post_details', {
			postObj: results[1],
			newList: results[0],
			relatedList: results[2],
			readerList: results[3]
		});
	});
});
router.get('/study/postDetails/:id/:type', function(req, res) {
	async.parallel([
		function(callback) {
			var params = {
				type: "!=4",
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			postServices.getPostById({
				id: req.params.id
			}, function(err, postObj) {
				postObj.setDataValue('createDate', dateUtils.formatBirthday(postObj.createDate));
				callback(null, postObj)
			});
		},
		function(callback) {
			var params = {
				type: "=" + req.params.type,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				readerCount: true,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				id:req.params.id
			};
			postServices.updatePostReaderCount(params, function(err, obj) {
				callback(null, obj);
			});
		}
	], function(err, results) {
		res.render('post_details', {
			postObj: results[1],
			newList: results[0],
			relatedList: results[2],
			readerList: results[3]
		});
	});
});
/**\n
 * 
 */
router.get('/heheren',function(req,res){
	var params = {
		type:"=4",
		limit:20
	};
	postServices.getPost(params, function(err, list) {
		async.map(list, function(item, callback) {
			item.banner = config.qiniu.download_website + item.banner;
			item.createDate = dateUtils.formatBirthday(item.createDate);
			callback(null, item);
		}, function(err, results) {
			res.render('heheren',{list: results});
		});
	});
});


/**
 *跳转超级炫酷的3D相册 
 */
router.get('/photo3D',function(req,res){
	res.render('3Dphoto',{});
});


/**\n
 * 学海无涯
 */
router.get('/study',function(req,res){
		async.parallel([
		/**
		 * 查询程序人生帖子
		 * @param {Object} callback
		 */
		function(callback) {
			var params = {
				type: "=1",
				limit: 20
			};
			postServices.getPost(params, function(err, list) {
				async.map(list, function(item, callback) {
					item.banner = config.qiniu.download_website + item.banner;
					//item.details = item.details.length>50?item.details.substring(0,50)+"...":item.details;
					item.summary = item.summary.length > 50 ? item.summary.substring(0, 50) + "..." : item.summary;
					item.createDate = dateUtils.formatBirthday(item.createDate);
					callback(null, item);
				}, function(err, results) {
					callback(null, results);
				});
			});
		},
		function(callback) {
			var params = {
				type: "!=4",
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		},
		function(callback) {
			var params = {
				readerCount: true,
				limit: 5
			};
			postServices.getPost(params, function(err, list) {
				callback(null, list);
			});
		}
	], function(err, results){
		res.render('study', {
			list: results[0],
			newList: results[1],
			readerList: results[2],
		});
	});
});

/**\n
 *目录 
 */
router.get('/catalog',function(req,res){
		async.parallel([
		function(callback) {
			var params = {
				type: "!=4",
				limit: 20
			};
			postServices.getPost(params, function(err, list) {
				async.map(list, function(item, callback) {
					item.createDate = dateUtils.formatBirthday(item.createDate);
					callback(null, item);
				}, function(err, results) {
					callback(null, results);
				});
			});
		}
	], function(err, results) {
		res.render('catalog', {
			list: results[0],
		});
	});
});

/**\n
 *关于无 
 */
router.get('/about',function(req,res){
	res.render('about',{});
});

module.exports = router;
