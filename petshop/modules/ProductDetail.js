import React from 'react'

export default React.createClass({
  render() {
    const {id} = this.props.params
    return (
      <div>
        <h2>{id}</h2>
      </div>
    )
  }
})
