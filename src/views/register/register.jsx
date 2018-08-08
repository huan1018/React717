import React, { Component } from 'react'
import $http from '../../utils/http'
import './register.css'

class Register extends Component {
    constructor() {
        super()
        this.toRegister = this.toRegister.bind(this)
    }
    render() {
        return <div id='register'> 
            <div className="register">
                <span>注册717</span>
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
                    <b onClick={this.toRegister}>注册</b>
                </p>
            </div>
        </div>
    }
    toRegister() {
        let { username, password } = this.refs
        $http.post('/user/register', {
            username: username.value,
            password: password.value
        })
        .then(res => {
            console.log(res)
        })
    }
}

export default Register