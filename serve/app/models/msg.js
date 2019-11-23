const { Sequelize, Model, Op } = require("sequelize");
const { sequelize } = require("../../core/db.js");


class Msg extends Model {
    static async getMessageList(id) {
        let msgList = await Msg.findAll({
            where: {
                uid: id
            }
        })
        return msgList
    }
    //批量更新   数据  需要更新的字段
    static async updateData(arr, updateKey) {
        //果id存在，则update，否则insert  主键冲突时更新  
        let isupDate = await Msg.bulkCreate(arr, { updateOnDuplicate: [`${updateKey}`] });
        return isupDate[0]

    }
    static async undone() {
        let unCount = await Msg.findAll({
            where  : {
                status : 1
            }
        })
        return unCount.length;

    }

}


Msg.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    article: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

}, {
    sequelize,
    tableName: "msg"
});

module.exports = Msg;