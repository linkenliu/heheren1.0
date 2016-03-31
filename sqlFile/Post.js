function Post(){
	var sql = "";
	
	this.getPost = function(params){
		sql = "select p.id,p.name,p.banner,p.picture,p.details,p.type,p.first_name as firstName,p.summary,p.reader_count as readerCount,";
		sql +="p.secondary_type as secondaryType,p.secondary_name as secondaryName,p.create_date as createDate";
		sql +=" from post p where 1=1";
		if(params.type){
			sql +=" and p.type "+params.type;
		}
		if(params.isRecommend){
			sql +=" and p.is_recommend "+params.isRecommend;
		}
		if(params.isBanner){
			sql +=" and p.is_banner "+params.isBanner;
		}
		if(params.readerCount){
			sql +=" order by p.reader_count desc,p.create_date desc ";
		}else{
			sql+=" order by p.create_date desc";
		}
		if(params.limit && params.pageIndex){
			sql+=" limit "+params.pageIndex+","+params.limit;
		}else{
			sql+=" limit "+params.limit;
		}
		return sql;
	}
	this.updatePostReaderCount = function(params){
		sql = "update post set reader_count=reader_count+1 where id ="+params.id;
		return sql;
	}
	
	/**
	 * 管理后台                 帖子列表
	 */
	this.queryPostList = function(params){
		sql = "select p.id,p.name,p.type,p.banner,p.first_name as firstName,p.secondary_name as secondaryName,p.state,p.create_date as createDate from post as p where 1=1 ";
		if(params.postChoose){
			if(params.postChoose == 1){
				sql +=" and p.name like '%"+params.keyWord+"%'";
			}else if(params.postChoose == 2){
				sql +=" and p.id = "+params.keyWord;
			}
		}
		sql +=" order by create_date desc";
		return sql;
	}
	/**
	 * 后台管理       查询一级分类
	 */
	this.queryFirst = function(params){
		sql = "select id,name from dictionarie where secondary_id = 0";
		return sql;
	}
	/**
	 * 后台管理     查询二级分类
	 */
	this.querySecondary = function(params){
		sql = "select id,secondary_name as secondaryName from dictionarie where secondary_id = "+params.id;
		return sql;
	}
}
module.exports = Post;