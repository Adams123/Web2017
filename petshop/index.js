// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './src/containers/App'
import Products from './src/containers/Products'
import ProductDetail from './src/containers/ProductDetail'
import Services from './src/containers/Services'

render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/products" component={Products}>
          <Route path="/products/:id" component={ProductDetail}/>
        </Route>
        <Route path="/services" component={Services}/>
      </Route>
    </Router>
), document.getElementById('app'))

