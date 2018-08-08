import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './sate'
import './cart.css'
import mapDispatchToProps from './dispatch'

import CartItem from '../../component/cartitem/cartitem'

class Cart extends Component {
    render() {
        let { cartList,totalCost,selectAll,selectedAll } = this.props
        console.log(cartList)
        return <div id='car'>
            <div className='carMain'>
                {
                    cartList.map((item, ind) => {
                        return <CartItem key={'cartItem'+ind} item={item}></CartItem>
                    })
                } 
            </div>
            <footer className='allCheck'>
                <span onClick={()=>{selectedAll()}} className={'bgacc iconfont '+(selectAll?'icon-duihao':'')}></span>
                <p>全选</p>
                <p>
                    <label>
                        <b>合计：</b>
                        <span>￥</span>
                        <span>{totalCost}</span>
                    </label>
                </p>
                <p>结算</p>
            </footer>

        </div>


    }
    componentDidMount() {
        console.log(this.props)
        this.props.fetchGoodsList(this.props.history)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)