// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

import React from 'react'
import NavLink from '../util/NavLink'
import axios from 'axios'
import Product from '../components/Product'

export default class Products extends React.Component {
	state: {};
	constructor(props){
		super(props);
		this.state = {
			products: [],
	  	show: false,
	  	create: false,
  	}	
    this._showNewProductForm = this._showNewProductForm.bind(this);
	}

	componentDidMount(){
  	let prods = [];
  	axios.get("/api/products").then(
  		(response) => {
  			for(let p of response['data']['products']){
  				prods.push({name: p['value']['name'],
  										id: p['value']['_id'],
  										stock: p['value']['stock'],
                      price: p['value']['price'],
  				});
  			}
				this.setState({show: true,
					create: false, products: prods});
  			console.log("Produtos:", prods);
  		}
  	);
	}

	contextTypes: {
    router: React.PropTypes.object
  }

	handleSubmit(event) {
    event.preventDefault()
    const id = event.target.elements[0].value
    const path = `/products/${id}`
    this.context.router.push(path)
  }
  _handleProducts(){
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
  _showNewProductForm(){
    this.setState({show: false, create: true});
  }
  _handleNewProduct(event){
    event.preventDefault()
    const name = event.target.elements[0].value
    const description = event.target.elements[1].value
    const price = event.target.elements[2].value
    const stock = event.target.elements[3].value
    const sold = event.target.elements[4].value
    axios.post('/api/products', {
      name: name,
      description: description,
      price: price,
      stock: stock,
      sold: sold
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
  	let container;
  	if(this.state.show){
  		container = (
  			<div>
          <button onClick={this._showNewProductForm} className="new-product-button">Novo Produto</button>
  				{ this._handleProducts() }
  			</div>
  		);
  	}else if(this.state.create){
  		container = (
  			<form id="form-new-product" onSubmit={this._handleNewProduct}>
          <ul>
            <li>
              <input type="text" placeholder="Nome do Produto"/>{' '}
            </li>
            <li>
              <input type="text" placeholder="Descrição"/>{' '}
            </li>
            <li>
              <input type="number" placeholder="Preço"/>{' '}
            </li>
            <li>
              <input type="number" placeholder="Quantidade em estoque"/>{' '}
            </li>
            <li>
              <input type="number" placeholder="Quantidade vendida"/>{' '}
            </li>
          <button type="submit">Cadastrar</button>
          </ul>
        </form>
	    );
  	}
    return(
    	<div>	
    		{ container }
	    	{ this.props.children }
	    </div>
    )
  }
}
