import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

class SwiperComp extends Component {
    render(){
        return <div className='swiper-container' ref='swDom'>
            <div className='swiper-wrapper'>
                <div className="swiper-slide">
                    <img src={require("../../assets/img/banner2.png")} alt=""/>
                </div>
                <div className="swiper-slide">
                    <img src={require("../../assets/img/banner.png")} alt=""/>
                </div>
                <div className="swiper-slide">
                    <img src={require("../../assets/img/banner1.png")} alt=""/>
                </div>
                <div className="swiper-slide">
                    <img src={require("../../assets/img/banner3.png")} alt=""/>
                </div>
            </div>
        </div>
    }
    componentDidMount () {
        new Swiper(this.refs.swDom,{
            autoplay:true,
            loop:true
        })
    }
}

export default SwiperComp