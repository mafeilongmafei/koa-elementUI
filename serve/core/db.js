const { Sequelize, Model } = require("sequelize")
const { clone, unset, isArray } = require("lodash")

const { dbName, user, password, port, host } = require("../config/config.js").database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql", //链接的那类数据库 需要下载相应的驱动
    host,
    port,
    logging: false, //输出sql语句,
    timezone: "+08:00", //时间

    define: {
        //create_time update_time delete_time 是记录的创建 更新 , 删除时间
        timestamps: true,
        paranoid: true, //生成deleteAt
        createdAt: "created_at", //对createdAt重命名
        underscored: true, //驼峰转下划线
        //查询取出的特定的字段
        scopes: {
            bh: {
                attributes: {
                    exclude: ["update_at", "deletedAt", "created_at", "password"]
                }
            }
        }
    }
});
sequelize.sync({
    force: false //是false不会每次重启,重新创建新的数据库
});

Model.prototype.toJSON = function() {
    let data = clone(this.dataValues)
    unset(data, 'updatedAt')
    unset(data, 'created_at')
    unset(data, 'deletedAt')

    //处理静态资源
    for (key in data){
        if(key === 'image' || key === 'avatar'){
            if(!data[key].startsWith('http')){
                data[key]=global.config.host + data[key]
            }
        }
    }

    //给model加了一个实例方法 ,只要你给exclude附一个数组 , 他就会排除你要排除的字段
    if (isArray(this.exclude)) {
        this.exclude.forEach((value) => {
            unset(data, value)
        })
    }
    return data

}


module.exports = {
    sequelize
};