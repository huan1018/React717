import React,{Component} from 'react'
import $http from '../../utils/http'
import SwiperComp from '../../component/swiper/swiperComp'
import GoodItem from '../../component/goodsComp/goodsComp.jsx'
import './home.css'

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            goodslist:[],
            channel_id:2,
            flag:true          
        }
        this.scrolling = this.scrolling.bind(this)
    }
    scrolling(){
        // console.log(this.refs.scroller.scrollTop)
        if(this.state.channel_id>9) return
        if( !this.state.flag ) return
        let {scroller} = this.refs;
        let st = scroller.scrollTop;
        let sw = scroller.scrollHeight;
        let dh = scroller.clientHeight;
        // console.log(sw-(st+dh))
        if(sw-(st+dh)<50){
            this.setState({
                flag:false
            })
            console.log(1)
            this.setState({
                channel_id:++this.state.channel_id
            })
            let { goodslist } = this.state;
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
            .then(res=>{
              const datas = JSON.parse(res);
            //   goodslist.push(datas.data.data)
              this.setState({ 
                  goodslist:[...goodslist,...datas.data.data]
              })
              this.setState({
                flag:true
            })
                console.log(JSON.parse(res))
            })
        }
    }
    render(){
        return <div className='home' ref='scroller' onScroll={this.scrolling}>
            <banner>
                <SwiperComp></SwiperComp>
            </banner>
            <section>
                <dl>
                    <dt><img src={require('../../assets/img/nav1.png')} alt=""/></dt>
                    <dd>
                        <span>家乡味道</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav2.png')} alt=""/></dt>
                    <dd>
                        <span>休闲零食</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav3.png')} alt=""/></dt>
                    <dd>
                        <span>牛乳奶品</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav4.png')} alt=""/></dt>
                    <dd>
                        <span>进口食品</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav5.png')} alt=""/></dt>
                    <dd>
                        <span>生鲜果蔬</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav6.png')} alt=""/></dt>
                    <dd>
                        <span>米面粮油</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav7.png')} alt=""/></dt>
                    <dd>
                        <span>调味调料</span>
                    </dd>
                </dl>
                <dl>
                    <dt><img src={require('../../assets/img/nav8.png')} alt=""/></dt>
                    <dd>
                        <span>酒水饮料</span>
                    </dd>
                </dl>
            </section>
            <div className='list'>
            {
                this.state.goodslist.map((item,index)=>{
                    return <GoodItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodItem>
                })
            }   
            </div>
        </div>
    }
    componentDidMount(){
      $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
      .then(res=>{
        const datas = JSON.parse(res);
        this.setState({ 
            goodslist:datas.data.data  
        })
          console.log(JSON.parse(res))
      })
    }
}

export default Home