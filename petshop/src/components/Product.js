import { Link } from 'react-router'
import React from 'react'

export default React.createClass({
	contextTypes: {
    router: React.PropTypes.object
  },
  render() {
  	return (
  		<div className="product-component">
  			<p><b>Nome: </b>{this.props.name}</p>
        <p><b>Preço: </b>{this.props.price}</p>
        <p><b>Descrição: </b>{this.props.description}</p>
  			<p><b>Qtd. em estoque: </b>{this.props.stock}</p>
        <p><b>Qtd. vendida: </b>{this.props.stock}</p>
  		</div>
  	);
  },
})