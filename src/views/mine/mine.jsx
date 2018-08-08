import React,{Component} from 'react'
import './mine.css'

class Mine extends Component {
    render(){
        return <div id='mine'>
            <dl className='information'>
                <dt><img src={require('../../assets/img/7.png')} alt=""/></dt>
                <dd>user name</dd>
            </dl>
            <ul className='manageBox'>
                <li>
                    <span><i className='iconfont icon-msnui-dianpu'></i>我的店铺</span>
                    <i className='iconfont icon-youjiantou1'></i>
                </li>
                <li>
                    <span><i className='iconfont icon-94'></i>我的社区</span>
                    <i className='iconfont icon-youjiantou1'></i>
                </li>
                <li>
                    <span><i className='iconfont icon-yly_zhanghuyue'></i>我的余额</span>
                    <i className='iconfont icon-youjiantou1'></i>
                </li>
                <li>
                    <span><i className='iconfont icon-dizhi'></i>我的地址</span>
                    <i className='iconfont icon-youjiantou1'></i>
                </li>
            </ul>
        </div>
    }
}

export default Mine