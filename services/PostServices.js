var sequelize = require('../utils/sequelizeDB');
var post = require('../sqlFile/Post'),query = new post();;
var postModel = require('../model/PostModel');
var moment = require('moment');
var postServices = function(){}

/**
 * 
 * 查询帖子列表
 * @param {Object} params
 * @param {Object} callback
 */
postServices.getPost = function(params,callback){
	 sequelize.query(query.getPost(params), {
        type: sequelize.QueryTypes.SELECT
    }).then(function (list) {
        callback(null, list);
    }).catch(function(err){
        callback(err);
 });
};


/**
 * 根据帖子ID查询帖子
 * @param {Object} params
 * @param {Object} callback
 */
postServices.getPostById = function(params,callback){
	postModel.findOne({
		where:params
	}).then(function(postObj){
		callback(null,postObj);
	}).catch(function(err){
		callback(err);
	});
};
/**
 * 修改帖子阅读数
 * @param {Object} params
 * @param {Object} callback
 */
postServices.updatePostReaderCount = function(params,callback){
	 sequelize.query(query.updatePostReaderCount(params), {
        type: sequelize.QueryTypes.UPDATE
    }).then(function (obj) {
        callback(null, obj);
    }).catch(function(err){
        callback(err);
 });
};


/*###################################管理后台#################################################*/
/**
 * 
 * 查询帖子列表         管理后台
 * @param {Object} params
 * @param {Object} callback
 */
postServices.queryPostList = function(params,callback){
	 sequelize.query(query.queryPostList(params), {
        type: sequelize.QueryTypes.SELECT
    }).then(function (list) {
        callback(null, list);
    }).catch(function(err){
        callback(err);
 });
};
/**
 * 
 * 查询一级分类         管理后台
 * @param {Object} params
 * @param {Object} callback
 */
postServices.queryFirst = function(params,callback){
	 sequelize.query(query.queryFirst(params), {
        type: sequelize.QueryTypes.SELECT
    }).then(function (list) {
        callback(null, list);
    }).catch(function(err){
        callback(err);
 });
};
/**
 * 
 * 查询二级分类         管理后台
 * @param {Object} params
 * @param {Object} callback
 */
postServices.querySecondary = function(params,callback){
	 sequelize.query(query.querySecondary(params), {
        type: sequelize.QueryTypes.SELECT
    }).then(function (list) {
        callback(null, list);
    }).catch(function(err){
        callback(err);
 });
};

/**
 * 管理后台         新增帖子
 */
postServices.addPost = function(params,callback){
	postModel.create({
		name:params.name,
		banner:params.banner,
		picture:params.picture,
		details:params.details,
		summary:params.summary,
		userId:params.userId,
		type:params.type,
		firstName:params.firstName,
		secondaryType:params.secondaryType,
		secondaryName:params.secondaryName,
		state:1,
		createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    	updateDate: moment().format("YYYY-MM-DD HH:mm:ss")
	}).then(function(obj){
		callback(null,obj);
	});
};
/**
 * 管理后台       根据编号查询帖子
 */
postServices.findOnePost = function(params,callback){
	postModel.findOne({
		where:params
	}).then(function(obj){
		callback(null,obj);
	}).catch(function(err){
		callback(err);
	});
};
/**
 * 管理后台     修改帖子
 */
postServices.updatePost = function(con,params,callback){
	postModel.update(params,{
			where:con
		}).then(function(obj){
             callback(null,obj);
		}).catch(function(err){
			callback(err);
		});
};

/**
 * 管理后台     删除帖子
 */
postServices.deletePost = function(params,callback){	
	postModel.destroy({where:params}).then(function(obj){
		callback(obj);
	});
};

module.exports = postServices;