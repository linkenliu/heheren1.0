var moment = require('moment');

var DISPLAY_DATE_FORMAT = 'YYYY-MM-DD HH:mm';

var API_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

var BIRTHDAY_DATE_FORMAT = 'YYYY-MM-DD';

var PUSH_DATE_FORMAT = 'YYYY-MM-DDTHH:mm';
var UTC_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

/**
 * 格式化日期，为web端页面显示使用
 * @param date
 * @returns {*}
 */
exports.format = function(date) {
	return moment(date).format(DISPLAY_DATE_FORMAT);
};

/**
 * 日期格式化
 * @return {[type]} [description]
 */
exports.formatDate = function(date) {
	return moment(date).format(API_DATE_FORMAT);
};

exports.formatBirthday = function(date) {
	return moment(date).format(BIRTHDAY_DATE_FORMAT);
};


/**
 * 时间本地化
 * "createDate": "2015-07-22T03:29:48.000Z",
 * 格式化为"createDate": "2015-07-22 11:29",
 * @param obj sequelize对象
 * @param field 字段名
 * @returns {*}
 */
exports.localFormat = function(obj, field) {
	obj.setDataValue(field, this.format(obj.getDataValue(field)));
};

/**
 * 判断日期是否是当天，不是放回false
 * @param date
 * @returns {boolean}
 */
exports.isToday = function(date) {
	date = new Date(date);
	var currentTime = new Date();
	if (date.getYear() != currentTime.getYear()) {
		return false;
	}else if (date.getMonth() != currentTime.getMonth()) {
		return false;
	}else if (date.getDay() != currentTime.getDay()) {
		return false;
	}else{
		return true;
	}
};

/**
 * 格式化UTC时间
 * @param date
 */
exports.formatUTCTime = function(date){
    var utcTime = moment(date,PUSH_DATE_FORMAT).utc().format(UTC_DATE_FORMAT);
    return utcTime+"Z";
};

/**
 *格式化GMT时间 
 * @param {Object} date
 */
exports.formatGMTDate = function(date){
	var dateTZ = new Date(date).toJSON();
	var datetime = moment(dateTZ).format(API_DATE_FORMAT);
	return datetime;
};
