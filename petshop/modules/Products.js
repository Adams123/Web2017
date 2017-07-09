import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return(
    	<div>
	    	<ul>
	    		<li>
	    			<NavLink to="/products/1">Buscar Produto</NavLink>
	    		</li>
	    		<li>
	    			<NavLink to="/">Novo Produto</NavLink>
	    		</li>
	    	</ul>	
	    	{ this.props.children }
	    </div>
    )
  }
})
