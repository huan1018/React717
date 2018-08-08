import {
    combineReducers
} from 'redux'
//添加购物车
export const ADD_CART = 'ADD_CART'
//删除购物车
export const DELETE_CART = 'DELETE_CART'
//改变商品数量
export const UPDATA_GOODS_COUNT = 'UPDATA_GOODS_COUNT'
//改变商品选中与否
export const UPDATA_GOODS_SELECTED = 'UPDATA_GOODS_SELECTED'
//更新整个商品列表
export const UPDATA_GOODS_LIST = 'UPDATA_GOODS_LIST'

export const SELECTED_ALL = 'SELECTED_ALL'

export const GET_COMMENT_LIST = 'GET_COMMENT_LIST'

let initState = {
    cart_list: []
}

function cart_list(state = initState.cart_list, action) {
    switch (action.type) {
        case ADD_CART:
            let flag = false; //新加的商品购物车里还没有
            state.forEach((item, index) => {
                if (item.goods_id == action.data.goods_id) {
                    ++item.count,
                        flag = true
                }
            })
            if (flag) {
                return [...state]
            } else {
                return [...state, action.data]
            }

            break;
        case UPDATA_GOODS_COUNT:
            let arr = [...state];
            arr.forEach(item => {
                if (item.goods_id == action.id) {
                    item.count = action.data
                }
            });
            return arr
            break;
        case UPDATA_GOODS_SELECTED:
            let arr2 = [...state];
            arr2.forEach(item => {
                if (item.goods_id == action.id) {
                    item.selected = action.data
                }
            });
            return arr2;
        case UPDATA_GOODS_LIST:
            return action.data;
        case SELECTED_ALL:
            let arr3 = [...state];
            arr3.forEach(item => {
                if (item.goods_id == action.id) {
                    item.selected = 1
                }
            });
            return arr3
        case GET_COMMENT_LIST:
            return action.data;
        default:
            return state
    }
    return state
}
export default combineReducers({
    cart_list
})