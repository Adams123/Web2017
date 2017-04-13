import React, {Component} from 'react';

var FormAdmin = React.createClass({
var cadastros = {
    {nome: "admin", senha: "admin", id: "0", telefone:"123123", email: "teste@teste.com", imagem: "teste"}
};

    getInitialState: function() {
      return {
        nome: null,
        senha: null,
        telefone: null,
        email: null,
        imagem: null
      };
    },

    onChildChange: function(childName, childValue){
      let newState = {};
      newState[childName] = childValue;
      this.setState(newState)
    },

    render: function()
    {
        return (
            <div>
            Form Admin
            <div id="formAdmin">
                <form>
                    <InternalForm name="nome" type="text" placeholder="Nome"/>
                    <br></br>
                    <input name="senha" type="text" placeholder="Senha"></input>
                    <br></br>
                    <input name="telefone" type="text" placeholder="Telefone"></input>
                    <br></br>
                    <input name="email" type="text" placeholder="Email"></input>
                    <br></br>
                    Foto: <input name="imagem" type="file" name="pic" accept="image/*"></input>
                    <br></br>
                    <input type="submit" value="Cadastrar"></input>
                </form>
            </div>
            </div>
            )
    }
});

class InternalForm extends React.Component{
    onFormChange(e) {
        this.props.onFormChange(this.props.name, e.target.value);
    };

    render() {
        return (
                <input type="text" onChange={this.onFormChange}/>
    );
  }
};


export default FormAdmin;
/*
var Itens = React.createClass({
    createTasks: function (item)
    {
        return <li key =
            {
                item.key
            } > {
                item.text
            } < /li>
    },

    render: function ()
    {
        var todoEntries = this.props.entries;

        function createTasks(item)
        {
            return <li key =
                {
                    item.key
                } > {
                    item.text
                } < /li>
        }

        var listItems = todoEntries.map(createTasks);

        return ( <
            ul className = "theList" >
                {
                listItems
                } <
            /ul>
        );
    }
});

var App = React.createClass({
    getInitialState: function ()
    {
        return {
            items: []
        };
    },
    addItem: function (e)
    {
        var itemArray = this.state.items;

        itemArray.push(
            {
            text: this._inputElement.value,
            key: Date.now()
            });

        this.setState(
            {
            items: itemArray
            });

        this._inputElement.value = "";

        e.preventDefault();
    },
    render: function ()
    {
        return ( <
            div className = "todoListMain" >
            <
            div className = "header" >
            <
            form onSubmit = {
                this.addItem
            } >
            <
            input ref =
                {
                (a) => this._inputElement = a
                }
            placeholder = "enter task" >
            <
            /input> <
            button type = "submit" > add < /button> <
            /form> <
            /div> <
            Itens entries =
            {
                this.state.items
            }
            /> <
            /div>
        );
    }
});

export default App;
*/
