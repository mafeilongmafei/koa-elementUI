const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db.js");
const bcrypt = require("bcryptjs");

const { AuthFailed } = require("../../core/http-exception.js");

class User extends Model {
  static async verifyNamePassword(nickname, password) {
    const user = await User.findOne({
      where: {
        nickname,
        status : 1
      }
    });
    if (!user) {
      throw new AuthFailed("账户不存在");
    }
    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      throw new AuthFailed("密码错误");
    }

    return user;
  }
  static async getAdminList(currentPage = 1) {
    // 一页4调数据
    var pageSize = 4;
    //每次调过多少条数据
    let offset = (currentPage -1 ) * 4;
    //findAndCountAll


   let data = await User.findAndCountAll({offset , limit : pageSize})
   return data
  }
  static async addAdminUser(nickname, password, status, rank, fileName) {
    fileName = global.config.visitImageDir + fileName;
    const user = await User.findOrCreate({
      where: { nickname },
      defaults: { nickname, password, status, rank, avatar: fileName }
    });

    if (user[1] === "false") {
      throw new AuthFailed("账户已存在");
    }
    return user;
  }
  static async deleteAdmin(id) {
    let user = await User.destroy({ where: { id:  id } , force : true });
    return user
  }
  static async findOneData(id) {
    const user = await User.findOne({
      where : {
        id
      }
    })
    return user

  }
  static async updateData(id , data) {
    let isUpdate = await User.update(data , {
      where : {
        id
      }
    })
    return isUpdate[0]
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique : true
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique : true 
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) {
        //生成盐
        const salt = bcrypt.genSaltSync(10);
        //加密  密码 盐
        const psw = bcrypt.hashSync(val, salt);
        //放到数据库中
        this.setDataValue("password", psw);
      }
    },
    avatar: Sequelize.STRING,
    rank: {
      type: Sequelize.STRING,
      defaultValue: "admin"
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    openid: {
      type: Sequelize.STRING(64), //64位的字符串
      unique: true //唯一
    }
  },
  {
    sequelize,
    tableName: "user"
  }
);

module.exports = User;
