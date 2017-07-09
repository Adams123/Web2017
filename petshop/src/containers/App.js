import React from 'react';
import NavLink from '../util/NavLink';

export default React.createClass({
  render() {
    return (
      <div >
        <div className="main-menu">
          <ul role="nav">
            <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
            <li><NavLink to="/products">Produtos</NavLink></li>
            <li><NavLink to="/services">Serviços</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
})
