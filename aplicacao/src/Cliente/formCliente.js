import React from 'react';

class FormCliente extends React.Component{
    render()
    {
        return (
            <div>
            Form Cliente
            <div id="form">
                <form>
                    <input type="text" placeholder="Nome"></input>
                    <br></br>
                    <input type="text" placeholder="Senha"></input>
                    <br></br>
                    <input type="text" placeholder="Endereço"></input>
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
};
export default FormCliente;
