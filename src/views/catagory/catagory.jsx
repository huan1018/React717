import React, { Component } from 'react'
//import $http from '../../utils/http'
import './catagory.css'
class Catagory extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0
        }
    }    
    render() {
        let catList = ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料'];
        let catcount = [require("../../assets/img/1.png"),require("../../assets/img/2.png"), require("../../assets/img/3.png"), require("../../assets/img/4.png"), require("../../assets/img/1.png"),
        require("../../assets/img/1.png"), require("../../assets/img/6.png"), require("../../assets/img/5.png"),
        require("../../assets/img/3.png")
        ]
        return (
            <div id="catagory">
                <div className="catagory-wrap ks-clear">
                    <div className="left-slide">
                        <ul>
                            {
                                catList.map((item, index) => {
                                    return <li className={this.state.activeIndex == index ? 'catagory-active' : ''}
                                        key={index} onClick={() => { this.toggleActive(index) }}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="right-slide">
                        <ul>
                            {
                                catcount.map((item, index) => {
                                    return <li className={this.state.activeIndex == index ? 'count-active' : 'count-none'}
                                        key={index} onClick={() => { this.addContentClass(index) }}>
                                        <img src={item} alt=""/>
                                        </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    toggleActive(ind) {
        this.setState({
            activeIndex: ind
        })
    }
    addContentClass(ind){
        this.setState({
            activeIndex: ind
        })
    }
}
export default Catagory