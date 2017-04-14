import React from 'react';
import Tema from './tema';

class login extends React.Component{
    constructor(props)
    {
        super(props);
    }
    handleSubmit(event){
        alert('Tudo ' + this.state.value);
    };
    render(){
        const tema = Tema;
        const styles = {
            form: {
                border: tema.border,
            },
            input: {
                backgroundColor: tema.backgroundColor,
            }
        };
    
        return (
            <div>
            <div id="form">
                <form style={styles.form}>
                    <input type="text" style={styles.input} placeholder="Usuário"></input>
                    <br></br>
                    <input type="text" placeholder="Senha"></input>
                    <br></br>
                    <input type="submit" value="Cadastrar"></input>
                </form>
            </div>
            </div>
            )
    }
};
export default login;
