// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

import React from 'react';
import NavLink from '../util/NavLink';

export default React.createClass({
  render() {
    return(
        <div>
        <div className="service-menu">
        <ul role="nav">
            <li><NavLink to="/services/insert">Inserir</NavLink></li>
            <li><NavLink to="/services/show">Exibir</NavLink></li>
        </ul>
        </div>
    <form id="form-new-service" className="formSubmit" onSubmit={this._handleNewService}>
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
            <li>
              <input type="file" placeholder="Foto"/>{' '}
            </li>
          <button type="submit">Inserir</button>
          </ul>
    </form>
    <table id="services-table" className="tabelas">
        <thead>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Foto</th>
        </thead>
        <tbody id="services-table-body">
        </tbody>
    </table>
        </div>
    );
}})
