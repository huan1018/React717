import React,{ Component } from 'react'
import router from './router/router'
import RouteWrap from './component/route.jsx'
import './assets/style/reset.css'
import './assets/font/iconfont.css'
import './assets/style/style.css'
import './assets/style/fontSize.js'
import {Provider} from 'react-redux'
import store from './store/store'
import { 
    BrowserRouter,
    Route,
    Switch,
    Redirect
 } from 'react-router-dom'

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from='/' to='/index/home'></Redirect>
                        <RouteWrap routes={router.routes}></RouteWrap>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
export default App