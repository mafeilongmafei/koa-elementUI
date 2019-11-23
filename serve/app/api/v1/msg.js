const Router = require("koa-router");
const { Auth } = require("../../../middleware/auth.js");
const Msg = require("../../models/msg.js")
const { ParameterException } = require("../../../core/http-exception.js");



const {
    idValidator,
    StatusAdminValidator
} = require("../../validators/validator.js");

const router = new Router({
    prefix: "/v1" //加前缀
});

//得到用户的消息列表
router.get("/UserMessage", new Auth().m, async (ctx, next) => {
    let v = await new idValidator().validate(ctx);
    let msgList = await Msg.getMessageList(v.get("query.id"))
    ctx.body = msgList

})
//文章是否已读
router.post("/changStatus", new Auth().m, async (ctx, next) => {
    let data = ctx.request.body;
    let upData = data.arr;
    let updateKey = data.key
    if (!upData || !data || !updateKey) {
        return new ParameterException("参数错误")
    }
    let isUpdate = await Msg.updateData(upData, updateKey)
    ctx.body = {
        isUpdate
    }
})
//有多少个未读文章
router.get("/undone"  , async (ctx, next) =>{
    let count = await Msg.undone()
    ctx.body = {
        count
    }

})


module.exports = router