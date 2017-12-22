import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends React.Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		onMoveToShelf: PropTypes.func.isRequired
	}

	render() {
		const { name, title, books, onMoveToShelf } = this.props
		
		return (
			<div className="bookshelf" key={name}>
		  <h2 className="bookshelf-title"> {title} </h2>
		  <div className="bookshelf-books">
		  	<ol className="books-grid">
		  		{books.map((book) => (
		  			<Book key={book.id} book={book} onSelect={onMoveToShelf}/>
		  		))}
		  	</ol>
		  </div>
		</div>
		)
	}
}

export default Shelf