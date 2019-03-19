let express = require('express');
let path = require('path');
let http = require('http');
let logger = require('morgan');//日志相关
let fs = require('fs');//文件读写
let FileStreamRotator = require('file-stream-rotator');//带周期的文件流
let session = require('express-session');
let memoryStore = new session.MemoryStore();
let app = express();
let server = require('http').Server(app);
let config = require('./app/routes/config/config.js');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



//每个模块相关入口
let user = require('./app/routes/user');          //用户--模块方法入口
let login = require('./app/routes/login');          //登陆--模块方法入口




// 引入路由中间件
// const routerAdmin = require('./app/router-admin');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());





// 设置服务端口
app.set('port',process.env.PORT || config.appport);


/**
 *  设置log文件存入   根目录/log 文件夹
 */
let logDirectory = path.join(__dirname, 'log');

// 确保日志目录存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// 新建一个周期为1天的日志文件写入
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

app.use(require('cors')());


// 设置日志格式
app.use(logger('combined', {stream: accessLogStream}));

//设置日志控制台输出
app.use(logger('dev'));
//解析json
app.use(bodyParser.urlencoded({ extended: false ,limit: '50mb'}));
app.use(bodyParser.json({ "limit":"50mb"}));

app.use(session({
    secret: 'Express_session',
    cookie: {maxAge: 60 * 1000 * 60*24*30 },  //cookie maxAge 60 minutes
    resave: false,
    saveUninitialized: true
}));





app.use('/user',user);
app.use('/login',login);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('请求的地址不存在，请确认。');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({"status":res.status, "msg": err.message});
});




server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});





module.exports = app;







