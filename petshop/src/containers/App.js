// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

import React from 'react';
import NavLink from '../util/NavLink';
import axios from 'axios'

export default class App extends React.Component{
  state: {};
  constructor(props){
    super(props);
    this.state = {
      logged: false
    }
    this._getLogin = this._getLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isLogged = this.isLogged.bind(this);
  }

  _getLogin(){
    if(this.state.logged){
      return(
          <li><NavLink to="/products">Produtos</NavLink></li>
      );
    }
  }

  handleSubmit(event){
    event.preventDefault()
    const userName = event.target.elements[0].value
    const pwd = event.target.elements[1].value
    
    let users = [];
    axios.get("/api/login").then(
      (response) => {
        for(let u of response['data']['users']){
          users.push({
            login: u['value']['login'],
            password: u['value']['password'],
          });
        }
        for(let user of users){
          if(user['login'] == userName && user['password'] == pwd)
            this.setState({
              logged: true 
            });
        }
        console.log("Produtos:", users);
      }
    );
  }

  isLogged(){
    if(!this.state.logged){
      return (
        <div>
            <form id="form-login" onSubmit={this.handleSubmit}>
                <label>Login:</label>
                <input type="text"/>
                <br/> <label>Senha:</label>
                <input type="password"/>
                <br/>
                <button className="submits" id="loginButton" type="submit">Entrar</button>
            </form>
          </div>
      )
    }else{
      return (
        <div>
          <p>Bem-vindo ao Petchoop! O Melhor petshop da web!</p>
        </div>
      )
    }
  }

  render() {
    return (  
      <div >
        <div className="main-menu">
          <ul role="nav">
            <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
            { this._getLogin() }
          </ul>
        </div>
        <div className="content">
          { this.isLogged() }
          { this.props.children }
        </div>
      </div>
    )
  }
}
