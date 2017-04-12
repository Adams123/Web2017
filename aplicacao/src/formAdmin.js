import React from 'react';

var FormAdmin = React.createClass({
    render: function()
    {
        return (
            <div>
            Form Admin
            <div id="form">
                <form>
                    <input type="text" placeholder="Nome"></input>
                    <br></br>
                    <input type="text" placeholder="Senha"></input>
                    <br></br>
                    <input type="text" placeholder="Telefone"></input>
                    <br></br>
                    <input type="text" placeholder="Email"></input>
                    <br></br>
                    Foto: <input type="file" name="pic" accept="image/*"></input>
                    <br></br>
                    <input type="submit" value="Cadastrar"></input>
                </form>
            </div>
            </div>
            )
    }
});

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
