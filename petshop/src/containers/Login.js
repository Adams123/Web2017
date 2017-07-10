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
	    	<h2>Login</h2>
	    </div>
    )
  }
})

