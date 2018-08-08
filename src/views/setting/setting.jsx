import React,{Component} from 'react'
import {loginout} from '../../utils/utils2.js'
import './setting.css'

class Setting extends Component {
    constructor(){
        super()
        this.loginout = this.loginout.bind(this)
        this.goback = this.goback.bind(this)
    }
    render(){
        return <div className='setting'>
            <div className="sethead">
                <ul>
                    <li>
                        <span className='iconfont icon-zuojiantou' onClick={this.goback}></span>
                    </li>
                    <li>设置</li>
                    <li></li>
                </ul>
            </div>
            <div className="mainset">
                <ul>
                    <li>我的头像</li>
                    <li>
                        <img src={require("../../assets/img/7.png")} alt=""/>
                        <i className='iconfont icon-youjiantou1'></i>
                    </li>
                </ul>
                <ul>
                    <li>用户名</li>
                    <li>
                        <span>user name</span>
                        <i className='iconfont icon-youjiantou1'></i>
                    </li>
                </ul>
                <ul>
                    <li>绑定手机号</li>
                    <li>
                        <i className='iconfont icon-youjiantou1'></i>
                    </li>
                </ul>
            </div>
            <p onClick={this.loginout} className='setbtn'>退出登录</p>
        </div>
    }
    loginout(){
        loginout()
        this.props.history.push('/index/home')
    }
    goback(){
        this.props.history.push('/index/mine')
    }
}

export default Setting