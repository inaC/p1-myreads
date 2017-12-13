import React from 'react'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		books: PropTypes.array.isRequired
	}

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
				  <h1>MyReads</h1>
				</div>
			</div>
		)
	}
}

export default ListBooks