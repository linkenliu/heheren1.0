/**
 * Created by admin on 2015/1/12.
 * 帖子表
 */
var sequelize = require('../utils/sequelizeDB');
var Sequelize = require('sequelize');
var PostModel = sequelize.define('post', {
    id: { type: Sequelize.INTEGER, primaryKey: true,field:'id'},
    name: { type: Sequelize.STRING, field:'name'},
    banner: { type: Sequelize.STRING, field:'banner'},
    picture: { type: Sequelize.STRING, field:'picture'},
    details: { type: Sequelize.STRING, field:'details'},
    userId: { type: Sequelize.INTEGER, field:'user_id'},
    type: { type: Sequelize.INTEGER, field:'type'},
    firstName: { type: Sequelize.STRING, field:'first_name'},
    summary: { type: Sequelize.STRING, field:'summary'},
    secondaryType: { type: Sequelize.INTEGER, field:'secondary_type'},
    secondaryName: { type: Sequelize.STRING, field:'secondary_name'},
    state: { type: Sequelize.INTEGER, field:'state'},
    isBanner: { type: Sequelize.INTEGER, field:'is_banner'},
    isRecommend: { type: Sequelize.INTEGER, field:'is_recommend'},
    readerCount:{ type: Sequelize.INTEGER, field:'reader_count'},
    createDate: { type: Sequelize.DATE, field:'create_date'},
    updateDate: { type: Sequelize.DATE, field:'update_date'}
}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    tableName: 'post',
    timestamps: false
});

module.exports = PostModel;
