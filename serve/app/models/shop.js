const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db.js");


class Shop extends Model {

}


Shop.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    avatar: {
        type: Sequelize.STRING,
    },
    //货号
    ArtNo: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    //上架
    putaway: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    //新品
    newProduct: {
        type: Sequelize.INTEGER,
        defaultStatus: 1,
    },
    //推荐
    recommend: {
        type: Sequelize.INTEGER,
        defaultStatus: 1,
    },
    shopName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    //库存
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    //sku库存
    SkuId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    //商品分类
    registerId : {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

}, {
    sequelize,
    tableName: "shop"
});

module.exports = Shop;