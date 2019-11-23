const { LinValidator, Rule } = require("../../core/lin-validator-v2.js")
let { User } = require("../models/user.js")
const { rankType } = require("../lib/enum.js")
const { ParameterException } = require("../../core/http-exception")
class LoginValitdator extends LinValidator {
    constructor() {
        super();
        this.nickname = [
            new Rule("isLength", "不允许为空", {
                min: 3
            })
        ];
        this.password = [
            new Rule("isLength", "不允许为空", {
                min: 3
            })
        ];
    }
}



class SettingValidator extends LoginValitdator {
    constructor() {
        super();
    }

    validateRankType(data) {
        let rank = data.body.rank || data.path.rank;
        let isRankType = rankType[rank];
        if (!isRankType) {
            throw new ParameterException("rank不是合法值")
        }
    }
}

class idValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isLength", "不允许为空", {
                min: 1
            })
        ]
    }
}
class StatusAdminValidator extends idValidator {
    constructor() {
        super()
        this.status = [
            new Rule("isLength", "不允许为空", {
                min: 1
            })
        ]
    }

}



module.exports = {
    LoginValitdator,
    SettingValidator,
    idValidator,
    StatusAdminValidator
};