// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369
import React from 'react'
import NavLink from '../util/NavLink'
import axios from 'axios'
import Service from '../components/Service'

export default class Services extends React.Component {
  state: {};
  constructor(props){
    super(props);
    this.state = {
      services: [],
      show: false,
      create: false,
    } 
    this._showNewServiceForm = this._showNewServiceForm.bind(this);
  }

  componentDidMount(){
    let prods = [];
    axios.get("/api/services").then(
      (response) => {
        for(let p of response['data']['services']){
          prods.push({name: p['value']['name'],
                      id: p['value']['_id'],
                      price: p['value']['price'],
                      description: p['value']['description'],
          });
        }
        this.setState({show: true,
          create: false, services: prods});
      }
    );
  }

  contextTypes: {
    router: React.PropTypes.object
  }

  handleSubmit(event) {
    event.preventDefault()
    const id = event.target.elements[0].value
    const path = `/services/${id}`
    this.context.router.push(path)
  }
  _handleServices(){
    let prods = [];
    for(let prod of this.state.services){
      prods.push(
        <Service id={prod['id']} 
                 name={prod['name']} 
                 price={prod['price']}
                 description={prod['description']}
        />
      );
    }
    return <div>{prods}</div>;
  }
  _showNewServiceForm(){
    this.setState({show: false, create: true});
  }
  _handleNewService(event){
    event.preventDefault()
    const name = event.target.elements[0].value
    const description = event.target.elements[1].value
    const price = event.target.elements[2].value
    axios.post('/api/services', {
      name: name,
      description: description,
      price: price,
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
          <button onClick={this._showNewServiceForm} className="new-product-button">Novo Serviço</button>
          { this._handleServices() }
        </div>
      );
    }else if(this.state.create){
      container = (
        <form id="form-new-product" onSubmit={this._handleNewService}>
          <ul>
            <li>
              <input type="text" placeholder="Nome do Serviço"/>{' '}
            </li>
            <li>
              <input type="text" placeholder="Descrição"/>{' '}
            </li>
            <li>
              <input type="number" placeholder="Preço"/>{' '}
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
