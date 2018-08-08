import React, {Component} from 'react'
import Home from '../views/home/index'
import Detail from '../views/detail/index'
import Login from '../views/login/index'
import Index from '../views/index/index'
import NoMatch from '../views/route404/index'
import Register from '../views/register/index'
import Serach from '../views/serach/index'
import Catagory from '../views/catagory/index'
import Mine from '../views/mine/index'
import Cart from '../views/cart/index'
import Result from '../views/result/index'
import Setting from '../views/setting/index'
let router = {
    routes:[
        {
            path:'/index',
            component:Index,
            childern:[
                {
                    path:'/index/home',
                    component:Home
                },
                {
                    path:'/index/catagory',
                    component:Catagory
                },
                {
                    path:'/index/cart',
                    component:Cart
                },
                {
                    path:'/index/mine',
                    component:Mine,
                    authorization:true //需要登录权限
                }
            ]
        },
        {
            path:'/detail',
            component:Detail
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/serach',
            component:Serach
        },{
            path:'/result',
            component:Result
        },{
            path:'/setting',
            component:Setting
        }
    ]
}
export default router