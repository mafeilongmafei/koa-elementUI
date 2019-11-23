
const path = require('path'); // 核心对象
module.exports = {
  environment: "development",
  database : {
    dbName : "vadmin",
    host  : "localhost",
    port : 3306,
    user : "root",
    password : "123456"
  },
  security: {
        secretKey: "abcdefg",
        expiresIn: 60 * 60 * 24 * 30
    },
  host : "http://localhost:3000",
  uploadDir : path.join(__dirname , "../static/images/"),
  visitImageDir : "/images/"
};
