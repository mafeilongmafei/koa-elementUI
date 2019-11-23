const Router = require("koa-router");
const {
    ParameterException
} = require("../../../core/http-exception.js");
const User = require("../../models/user.js");
const RouteTable = require("../../../config/data.js");
const { Auth } = require("../../../middleware/auth.js");
const path = require("path")

const {
    LoginValitdator,
    SettingValidator,
    idValidator,
    StatusAdminValidator
} = require("../../validators/validator.js");
const router = new Router({
    prefix: "/v1/user" //加前缀
});

//用户登录
router.post("/login", async (ctx, next) => {
    //验证参数
    const v = await new LoginValitdator().validate(ctx);
    //1 先判断用户存在不
    let user = await User.verifyNamePassword(
        v.get("body.nickname"),
        v.get("body.password")
    );
    //2 存在返回一个token  还要返回权限
    const { generateToken } = require("../../../core/util.js");
    let token = generateToken(user.id, user.rank);
    //得这样添加属性
    user.setDataValue("token", token);

    ctx.body = {
        user
    };
});
//得到所有的路由信息
router.get("/router", async (ctx, next) => {
    ctx.body = {
        RouteTable
    };
});
//获取所有管理员信息
router.post("/admin/list", new Auth(2).m, async (ctx, next) => {
    let pageSize = ctx.request.body && ctx.request.body.pageSize
    let adminList = await User.getAdminList(pageSize);
    ctx.body = adminList
});
//添加管理员
router.post("/addAdmin", new Auth(2).m, async (ctx, next) => {
    const v = await new SettingValidator().validate(ctx);
    const filePath = ctx.request.files.avatar && ctx.request.files.avatar.path;
    let fileName = path.parse(filePath).base;
    if (!fileName) {
        throw new ParameterException("请上传文件");
    }
    const user = await User.addAdminUser(
        v.get("body.nickname"),
        v.get("body.password"),
        v.get("body.status"),
        v.get("body.rank"),
        fileName
    );
    ctx.body = {
        user
    };
});

//删除管理员
router.post("/adminDelete", new Auth(2).m, async (ctx, next) => {
    const v = await new idValidator().validate(ctx);
    const user = await User.deleteAdmin(v.get("body.id"))
    ctx.body = {
        isDelete: user
    }
})

//修改管理员
router.post("/adminSetting", new Auth(2).m, async (ctx, next) => {
    let type = ctx.request.body && ctx.request.body.type;
    let isUpdate = null
    if (type === "status") {
        let v = await new idValidator().validate(ctx);
        isUpdate = await User.updateData(v.get("body.id"), { status: v.get("body.status") })

    }
    ctx.body = {
        isUpdate
    }


})

module.exports = router;