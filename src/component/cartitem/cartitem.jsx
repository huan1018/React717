import React, { Component } from 'react'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch'
import './cartitem.css'

class CartItem extends Component {
    
    render() {
        let {updataCount,item,toggleSelect} = this.props
        return (
            <div className='shop-cart'>
                <div className='shopbox'>
                    <div>
                        <span 
                            onClick={()=>{toggleSelect((1-item.selected),item.goods_id)}}
                            className={'select-btn iconfont'+(item.selected == 0 ? 'select-btn iconfont':'select-btn iconfont icon-duihao')}
                        ></span>
                        <img src={'http://www.lb717.com/' + item.obj_data} alt="" />
                    </div>
                    <div>
                        <p className='title'>{item.goods_name}</p>
                        <p>X{item.count}</p>
                        <p>￥{item.discount_price}</p>
                    </div>
                    <div>
                        <span onClick={() => { updataCount(--item.count, item.goods_id) }}>-</span>
                        <span className='num'>{item.count}</span>
                        <span onClick={() => { updataCount(++item.count, item.goods_id) }}>+</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null,mapDispatchToProps,null,{pure:false})(CartItem)
