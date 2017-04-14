import React from 'react';

var Login = React.createClass({

    render: function()
    {
        return (
            <div>
            <div id="form">
                <form>
                    <input type="text" placeholder="Usuário"></input>
                    <br></br>
                    <input type="password" placeholder="Senha"></input>
                    <br></br>
                    <input type="submit" value="Cadastrar"></input>
                </form>
            </div>
            </div>
            )
    }
});
export default Login;
