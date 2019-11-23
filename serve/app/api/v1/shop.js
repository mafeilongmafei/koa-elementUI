const Router = require("koa-router");
const { Auth } = require("../../../middleware/auth.js");
const Shop = require("../../models/shop.js")
const { ParameterException } = require("../../../core/http-exception.js");




const router = new Router({
    prefix: "/v1/shop" //加前缀
});

router.get("/list" , async (next , ctx)=>{
    Shop.create({
        
    })
})

module.exports = router