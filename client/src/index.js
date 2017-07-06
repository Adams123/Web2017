import React from 'react';

var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Petchoop</h1>				
			</div>
		);
	}
});

React.render(<App> </App>, document.getElementById('app'));

