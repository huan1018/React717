import React, { Component } from 'react'
import './serach.css'

class Serach extends Component {
    constructor() {
        super()
        this.toSerach = this.toSerach.bind(this)
        this.toResult = this.toResult.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
        this.state = {
            historylist: []
        }
    }
    render() {
        let { historylist } = this.state
        return <div id='search'>
            <header className='headserch'>
                <ul>
                    <li>
                        <span className='iconfont icon-sousuo'></span>
                        <input type="text" ref='keyWorlds' placeholder='请输入您要购买的商品'/>
                    </li>
                    <li><span onClick={this.toSerach}>搜索</span></li>
                </ul>
            </header>
            <div className='commone-serach'>
                <p><span>最近搜索</span><span onClick={this.clearHistory} className='iconfont icon-ai-delete'></span></p>
                {
                    historylist.length == 0 ? <p>暂无搜索记录....</p>
                        : <ul>
                            {
                                this.state.historylist.map((item, ind) => {
                                    return <li key={ind} onClick={() => {
                                        this.toResult(item)
                                    }}>{item}</li>
                                })
                            }
                        </ul>
                }
            </div>
            <div className="search">
                <p>大家都在搜</p>
                <span>粽子</span>
                <span>锅巴</span>
                <span>酱</span>
                <span>小吃</span>
            </div>
        </div>
    }
    toResult(keyWorlds) {
        this.props.history.push('/result', {
            key_worlds: this.refs.keyWorlds.value
        })
    }
    clearHistory(){
        localStorage.removeItem('SearchHistory')
        this.setState({
            historylist:[]
        })
    }
    toSerach() {

        if (!this.refs.keyWorlds.value) return;
        let keyWorlds = this.refs.keyWorlds.value;
        let ls = localStorage;
        if (ls.getItem('SearchHistory')) {
            let shArr = JSON.parse(ls.getItem('SearchHistory'));
            if (shArr.indexOf(keyWorlds) > 1) return;
            shArr.push(keyWorlds);
            ls.setItem('SearchHistory', JSON.stringify([shArr]))
        } else {
            ls.setItem('SearchHistory', JSON.stringify([keyWorlds]))
        }

        this.props.history.push('/result', {
            key_worlds: this.refs.keyWorlds.value
        })
    }
    componentDidMount() {
        if (localStorage.getItem('SearchHistory')) {
            this.setState({
                historylist: JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
}

export default Serach