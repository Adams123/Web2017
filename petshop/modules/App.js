import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/products">Produtos</NavLink></li>
          <li><NavLink to="/services">Serviços</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
