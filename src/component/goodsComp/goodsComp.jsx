import React,{Component} from 'react'
import $http from '../../utils/http'
import './goodsComp.css'
import { getCookie } from '../../utils/utils'
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'
import {ADD_CART} from '../../store/reducers'
import {T} from 'react-toast-mobile'

class GoodsComp extends Component {
    constructor(){
        super()
        this.addCart=this.addCart.bind(this)
    }
    render(){
        let {data} = this.props
        return <dl className='lists' onClick={()=>this.toDetal(data.goods_id)}>
            <dt>
                <img src={'http://www.lb717.com/'+data.obj_data} alt=""/>
            </dt>
            <dd>
                <p className='detal'>{data.goods_name}</p>
                <p>
                    <span className='price'>￥{data.discount_price}</span>
                    <i className='iconfont icon-gouwuche' onClick={this.addCart}></i>
                </p>
                {/* <ToastContainer></ToastContainer> */}
            </dd>
        </dl>
    }
    addCart(e){
        e.stopPropagation()
        let{data} = this.props;
        if(getCookie('token')){
            $http.post('/user/Cart/addCart',{
                goods_id:data.gooss_id,
                goods_info:data,
                token:getCookie('token')
            })
            .then((res)=>{
                console.log(res)
                if(res==1){
                    T.notify('购物车添加成功')
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1,
                            selected:0
                        }
                    })
                }else{
                    toast.warn(res.info,{
                        position:toast.POSITION.TOP_CENTER,
                        hideProgressBar:true,
                        autoClose:2000,
                        className:'test'
                    })
                    let {history,location} = this.props
                        history.push('/login',{
                        from:location.pathname
            })
                }
                
            })
        }else{
            let {history,location} = this.props
            history.push('/login',{
                from:location.pathname
            })
        }        
        console.log(getCookie('token'))
    }
    toDetal(goods_id){
        console.log(this.props)
        const { data,history} = this.props
        history.push('/detail?/goods_id='+goods_id,{
            goods_id:goods_id,
            goods_name:data.goods_name,
            discount_price:data.discount_price,
            obj_data:data.obj_data
        })

    }
}

export default connect(null)(GoodsComp)