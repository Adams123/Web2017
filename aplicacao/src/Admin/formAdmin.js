import React from 'react';

class FormAdmin extends React.Component{
    // var cadastros = {'nome': "admin", 'senha': "admin",
    //      'id': "0", 'telefone':"123123",
    //      'email': "teste@teste.com", 'imagem': "teste"
    // },

    getInitialState() {
      return {
        nome: 'admin',
        senha: 'admin',
        telefone: null,
        email: null,
        imagem: null
      };
    }

    onChildChange(childName, childValue){
      let newState = {};
      newState[childName] = childValue;
      this.setState(newState)
    }

    render()
    {
        return (
            <div>
            Form Admin
            <div id="formAdmin">
                <form>
                    <input name="nome" type="text" placeholder="Nome"/>
                    <br />
                    <input name="senha" type="password" placeholder="Senha"></input>
                    <br />
                    <input name="telefone" type="text" placeholder="Telefone"></input>
                    <br />
                    <input name="email" type="text" placeholder="Email"></input>
                    <br />
                    Foto: <input name="imagem" type="file" accept="image/"></input>
                    <br />
                    <input type="submit" value="Cadastrar"></input>
                </form>
            </div>
            </div>
            )
    }
};

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
