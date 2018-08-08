const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()

app.use(bodyParser.json())
app.all(bodyParser.json())
//设置跨域 cors
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Content-Type,Token")
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})
// 商品列表接口
const options = {
    hostname: 'www.lb717.com',
    port: 80,
    path: '/mall/index/getGoodsChannel',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
};
const http = require('http')
const querystring = require('querystring')
app.post('/mall/index/getGoodsChannel', function (req, res) {
    console.log(JSON.stringify(req.body))
    let data = '';
    let request = http.request(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            data += chunk
        });
        response.on('end', () => {
            res.end(JSON.stringify(data))
        });
    })
    request.write(querystring.stringify(req.body))
    request.end()
})

//注册接口
const fs = require('fs')
app.post('/user/register', function (req, res) {
    console.log(req.body)

    let user = fs.readFileSync(__dirname + '/user.json', {
        encoding: "utf-8"
    })

    user = JSON.parse(user)
    user.push(req.body)
    fs.writeFile(__dirname + '/user.json', JSON.stringify(user), function () {
        res.end(JSON.stringify({
            "success": 1,
            "info": "register success"
        }))
    })
})
//登录接口
app.post('/user/login', function (req, res) {
    console.log(req.body)

    let user = fs.readFileSync(__dirname + '/user.json', {
        encoding: "utf-8"
    })
    user = JSON.parse(user)
    let login = req.body;
    let resInfo = {
        success: 0,
        info: "用户名密码错误",
        token: ''
    }
    user.forEach(use => {
        if (use.username == login.username && use.password == login.password) {
            resInfo.success = 1;
            resInfo.info = "login success"
        }
    })
    if (resInfo.success == 1) {
        resInfo.token = jwt.sign(login, "1511", {
            expiresIn: 60 * 60 //设置token字段时间
        })

    }

    res.end(JSON.stringify(resInfo))
})

//添加购物车

app.post('/user/Cart/addCart', function (req, res) {
    console.log(req.body.token)
    jwt.verify(req.body.token, '1511', (err, decoded) => { //验证token的合法性
        if (err) {
            res.end(JSON.stringify({
                info: '登录失败,请重新登录',
                detail: err.TokenExpiredError
            }))
        } else {
            console.log(decoded)
            let cartInfo = JSON.parse(fs.readFileSync(__dirname + '/cart_info.json', {
                encoding: 'utf-8'
            }))
            if (cartInfo[decoded.username]) {
                let recordList = cartInfo[decoded.username];
                let flag = false; //新添商品
                recordList.forEach((item, ind) => {
                    if (item.goods_id == req.body.goods_info.goods_id) {
                        ++item.count;
                        flag = true;
                    }
                })
                if (!flag) {
                    let record = req.body.goods_info;
                    record.count = 1;
                    record.selected = 0;
                    cartInfo[decoded.username].push(record)
                }
            } else {
                let record = req.body.goods_info;
                record.count = 1;
                record.selected = 0;
                cartInfo[decoded.username] = [record]
            }
            // console.log(cartInfo)
            fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartInfo), function () {
                res.end('1')
            })

        }
    })
})

app.get('/mobile/Category/categorySon', function (req, res) {
    console.log(req.query)
    // http.request({}, function () {

    // })
})
app.post('/user/Cart/goodsList',function(req,res){
    jwt.verify(req.body.token,'1511',(err,decode)=>{
        if(err){
            res.end(JSON.stringify({
                info:'登录过期，请重新登录',
                detail:err.TokenExpiredError,
                error:1
            }))
        }else{
            let goodsRecode = JSON.parse(fs.readFileSync(__dirname +'/cart_info.json',{encoding: 'utf-8'}))
           
            res.json(goodsRecode[decode.username])
        }
    })
})


app.listen(9000, function () {
    console.log('server listen 9000')
})