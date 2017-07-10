// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

import React from 'react'
import axios from 'axios'
import Product from '../components/Product'

export default class Products extends React.Component{
	state: {};
	constructor(props){
		super(props);
		this.state = {
			ready: false,
		}
	}

	componentDidMount(){
		const path = `/api/products/${this.props.id}`
		let prods =[];
		axios.get(path).then(
  		(response) => {
  			console.log(response['data']);
  			// for(let p of response['data']['products']){
  			// 	prods.push({name: p['value']['name'],
  			// 							id: p['value']['_id'],
  			// 							stock: p['value']['stock'],
     //                  price: p['value']['price'],
  			// 	});
  			// }
  			// console.log("Produtos:", prods);
  			// this.setState({ready: true})
  		}
  	);
	}
	_handleProduct(){
  	let prods = [];
  	for(let prod of this.state.products){
  		prods.push(
  			<Product id={prod['id']} 
  							 name={prod['name']} 
  							 stock={prod['stock']}
                 price={prod['price']}
        />
  		);
  	}
  	console.log(prods);

  	return <div>{prods}</div>;
  }

  render() {
  	console.log("DETAIL?", this.props.id);
    return (
      <div className="product-detail">
        <h2>{ this.props.id }</h2>
      </div>
    )
  }
};
