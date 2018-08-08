import React, { Component } from 'react'
import $http from '../../utils/http'
import './login.css'

class Login extends Component {
    constructor() {
        super()
        this.toLogin = this.toLogin.bind(this)
    }
    render() {
        return <div id='login'>
            <div className="headLogin">
                <span></span>
                <span>登录717</span>
                <span>注册</span>
            </div>
            <div className="loginSection">
                <p>
                    <span className='iconfont icon-weibiaoti2fuzhi12'></span>
                    <input type="text" className='username' ref='username' placeholder='请输入您的用户名' />
                </p>
                <p>
                    <span className='iconfont icon-mima'></span>
                    <input type="password" className='password' ref='password' placeholder='请输入您的密码' />
                </p>
                <p>
                    <b onClick={this.toLogin}>立即登录</b>
                </p>
            </div>

        </div>
    }
    toLogin() {
        let { username, password } = this.refs
        $http.post('/user/login', {
            username: username.value,
            password: password.value
        })
            .then(res => {
                console.log(res.token)
                if (res.success == 1) {
                    let from = this.props.location.state ? this.props.location.state.from || 'index/home' : 'index/home'
                    document.cookie = "token=" + res.token;
                    this.props.history.push(from)
                } else {
                    alert('错误登录')
                }

            })
    }
}

export default Login