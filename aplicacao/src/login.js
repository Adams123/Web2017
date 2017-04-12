import React from 'react';

var login = React.createClass({
    render: function()
    {
        return (
            <div>
            <div id="form">
                <form>
                    <input type="text" placeholder="Usuário"></input>
                    <br></br>
                    <input type="text" placeholder="Senha"></input>
                    <br></br>
                    <input type="submit" value="Cadastrar"></input>
                </form>
            </div>
            </div>
            )
    }
});
export default login;
