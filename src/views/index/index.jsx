import React, { Component } from 'react'
import $http from '../../utils/http'
import RouteWrap from '../../component/route.jsx'
import { NavLink, Route } from 'react-router-dom'
import router from '../../router/router'
import Toast from 'react-toast-mobile'
import 'react-toast-mobile/lib/react-toast-mobile.css'

import './index.css'
class Index extends Component {
    constructor() {
        super()
        this.toSerach = this.toSerach.bind(this)
        this.toSetting = this.toSetting.bind(this)
    }
    toSerach() {
        let { history } = this.props
        history.push('/serach')

    }
    render() {
        // console.log(router.routes[0].childern)
        return <div id='index'>
        <Toast/>
            <div className='head'>
                {
                    /\/index\/mine/.test(location.pathname)
                    
                        ? <ul className='minHead'>
                            <li><span onClick={this.toSetting} className='iconfont icon-chilun01'></span></li>
                            <li>我的717</li>
                            <li></li>
                        </ul>
                        : <ul className='indexHead'>
                            <li>
                                <span className='iconfont icon-sousuo'></span>
                                <input
                                    type="text"
                                    placeholder='请输入您要购买的商品'
                                    onFocus={this.toSerach}
                                />
                            </li>
                            <li>
                                <i className='iconfont icon-msnui-dianpu'></i>
                                <span>我的店铺</span>
                            </li>
                        </ul>
                }

            </div>
            <div className='content'>
                <RouteWrap routes={router.routes[0].childern}></RouteWrap>
            </div>
            <ul className='foot'>
                <li>
                    <NavLink to='/index/home' activeClassName='active'>
                        <i className='iconfont icon-shouye1'></i>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/catagory' activeClassName='active'>
                        <i className='iconfont icon-fenlei'></i>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/cart' activeClassName='active'>
                        <i className='iconfont icon-gouwuche'></i>
                        <span>购物车</span>
                    </NavLink>

                </li>
                <li>
                    <NavLink to='/index/mine' activeClassName='active'>
                        <i className='iconfont icon-weibiaoti2fuzhi12'></i>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    }
    componentDidMount() {
        $http.get("/server/test.json", { id: 1, name: 'tj' })
            .then(data => {
                // console.log(data)
            }).catch(err => {
                // console.log(err)
            })
    }
    toSetting(){
        this.props.history.push('/setting')
    }
}

export default Index