const Mock = require('mockjs')
const { Random } =Mock
const fs = require('fs')
let arr = ['热销','套餐类','烧饼类','进店必买','酱肉类','凉菜类','饮料','汤类']
Random.extend({
    mealType:() => {
        let item = Random.pick(arr)
        let idx = arr.indexOf(item)
        let deleted = arr.splice(idx,1)
        return item
    }
})
let res = Mock.mock({
    "success":1,
    "info":'请求成功',
    "code":1001,
    "list|8":[
        {
            "cataid":1,
            "title":()=>Random.mealType(),
            "goodslist|6":[
                {
                    "name":()=>Random.cword(2,5),
                    "num":()=>Random.natural(1,9999),
                    "price":()=>Random.natural(1,99),
                    "img":()=>Random.image('60x60', Random.color(), '#FFF', 'png', '!')
                }
            ]
        }
        
    ]
})
fs.writeFileSync('meal.json',JSON.stringify(res))