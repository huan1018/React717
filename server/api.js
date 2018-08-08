const jwt = require('jsonwebtoken')
const http = require('http')
const querystring = require('querystring')
const fs = require('fs')

function queryApi(url, methods, params) {
    return new Paromise((resolve, reject) => {
        let data = ''
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }
        let request = http.request(options, (response) => {
            response.setEncoding('utf8')
            response.on('data', (chunk) => {
                data += chunk
            }); 
            response.on('end', () => {
                resolve(JSON.stringify(data))
            })
        })
        if (methods.toLowerCase() == 'post') {
            require.write(querystring.stringify(params))
        }
        request.end()
    })

}
module.export = function (app) {
    // 商品列表接口
    app.post('/mall/index/getGoodsChannel', function (req, res) {
        queryApi('/mall/index/getGoodsChannel', post, req.body)
            .then((data) => {
                res.end(data)
            })
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
        fs.writeFile('user.json', JSON.stringify(user), function () {
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
                    cartInfo[decoded.username].push(req.body.goods_info)
                } else {
                    cartInfo[decoded.username] = [req.body.goods_info]
                }
                console.log(cartInfo)
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartInfo), function () {
                    res.end('1')
                })

            }
        })
    })

    //分类接口
    app.get('/mobile/Category/categorySon', function (req, res) {
        console.log(req.query)
        queryApi('/mobile/Category/categorySon' + querystring.stringify(req.query), get, )
            .then(data => {
                res.json(data)
            })
    })
}
