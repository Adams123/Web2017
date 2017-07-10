import React from 'react'

export default React.createClass({
  

  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const pwd = event.target.elements[1].value
    const path = `/login`
    this.context.router.push(path)
  },

  render() {
    return (
      <div>
				<form id="form-login" onSubmit={this.handleSubmit}>
						<label>Login:</label>
						<input type="text"/>
						<br/> <label>Senha:</label>
						<input type="password"/>
						<br/>
						<button class="submits" id="loginButton" type="submit" onclick="checkAdmin()">Entrar</button>
				</form>
        {this.props.children}
      </div>
    )
  }
})

