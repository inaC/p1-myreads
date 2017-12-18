import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooksResults extends React.Component {
	static propTypes = {
		result: PropTypes.array.isRequired,
		onMoveToShelf: PropTypes.func.isRequired,
		book_ids: PropTypes.object.isRequired
	}

	render() {
		const {result, book_ids} = this.props
		result.forEach(book => {book['shelf'] = book_ids[book.id] || 'searching'})
		return(
			<div className="search-books-results">
			  <ol className="books-grid">
			  	{result.map(book => <Book key={book.id} book={book} onSelect={this.props.onMoveToShelf}/>)}
			  </ol>
			</div>
		)
	}
}

export default SearchBooksResults