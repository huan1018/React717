import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import {getCookie} from '../utils/utils2'
import {Redirect} from 'react-router-dom'

function isLogin(){
    return !!getCookie('token')
}
class RouteWrap extends Component {
    render(){
        const {routes} = this.props
        // console.log(routes)
        return (
            <div className='main'>
                {
                    routes.map((item,ind) => {
                        return <Route path={item.path} key={ind} render={(router) => {
                            if(item.authorization){
                                // console.log(isLogin())
                                return !isLogin() ? <Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect> :
                                <item.component {...router} routes={item.children}> </item.component>
                            }
                            return <item.component {...router} routes={item.children}> </item.component>
                        }}></Route>
                    })
                }
            </div>
        )
    }
}

export default RouteWrap