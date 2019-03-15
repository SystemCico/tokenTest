let express = require('express');
let router = express.Router();
let models = require('./models/models');
let TestDemo = models.Demo;


router.get('/', function (req, res) {
    async function fun() {
        let testDemo = await TestDemo.findOne();
        res.json({status:200,msg:'查询成功',data:testDemo});
        
    }

    fun().catch(err => {
        console.log(err);
        res.json({status: 901, msg: '出错啦', err: err});
    })

});

router.post('/login', function (req, res) {
    let userName=req.body.userName;
    let password=req.body.password;
    async function fun() {
        let passage = {};
        passage['userName'] = userName;
        passage['password'] = password;
        console.log(passage);
        let testDemo = await TestDemo.findOne(passage);
        if(testDemo){
            res.json({status:200,msg:'登录成功',name:testDemo.name,phone:testDemo.phone});
        }else{
            res.json({status:902,msg:'登陆失败，没有此用户'});
        }

    }
    fun().catch(err => {
        console.log(err);
        res.json({status: 901, msg: '出错啦', err: err});
    })

});

// 验证jsonwebtoken是否过期的中间件，在login接口后面执行，除了login接口的请求外，其他接口都需要验证token
router.use(function jwtVerify(req, res, next) {
    // let token = req.get('token')
    // console.log(token)
    // var cert = fs.readFileSync('./public.key');
    // // 先解密
    // jwt.verify(token, cert,function(err,decoded){
    //     if(err || !decoded) res.send({data:null,status:false,msg:err})
    //
    //     if(decoded.user == payload.user){
    //         next();
    //     }
    //
    // });
});


module.exports = router;