// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

import { Link } from 'react-router'
import React from 'react'

export default React.createClass({
	contextTypes: {
    router: React.PropTypes.object
  },
  _handleClick(){
  	const path = `/products/${this.props.id}`
    this.context.router.push(path)
  },
  render() {
  	return (
  		<div className="product-component">
  			<p><b>Nome: </b>{this.props.name}</p>
        <p><b>Nome: </b>{this.props.price}</p>
  			<p><b>Qtd. em estoque: </b>{this.props.stock}</p>
  			<button onClick={this._handleClick}>Detalhes</button>
  		</div>
  	);
  },
})