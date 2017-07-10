import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './src/containers/App'
import About from './src/containers/About'
import Repos from './src/containers/Repos'
import Repo from './src/containers/Repo'
import Home from './src/containers/Home'
import Products from './src/containers/Products'
import ProductDetail from './src/containers/ProductDetail'
import Services from './src/containers/Services'
import Login from './src/containers/Login'


render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/products" component={Products}>
          <Route path="/products/:id" component={ProductDetail}/> 
        </Route>
        <Route path="/services" component={Services}/>
        <Route path="/repos" component={Repos}>
          <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
), document.getElementById('app'))

