const jwt = require('jsonwebtoken')
let config = require('../config/config.js')
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

/* const generateToken = function(uid, scope){
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    const token = jwt.sign({
        uid,
        scope
    },secretKey,{
        expiresIn
    })
    return token
} */
//生成token scope可以設置權限
const generateToken = function (uid , scope) {
    const secretKey = config.security.secretKey
    const expiresIn = config.security.expiresIn
    const token = jwt.sign({
        uid,
        scope
        //生成加密令牌的key 重要
    } , secretKey , {//配置对象
        expiresIn // 过期时间   
    })
    return token
}



module.exports = {
    findMembers,
    generateToken,
}

