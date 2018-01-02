import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const SearchBooksResults = function(props) {
	const {result, book_ids} = props
	result.forEach(book => {book['shelf'] = book_ids[book.id] || 'searching'})
	
	return(	
		<div className="search-books-results">
			  <ol className="books-grid">
			  	{result.map(book => (
			  		<Book 
			  			key={book.id} 
			  			book={book} 
			  			onSelect={props.onMoveToShelf}
			  		/>
			  	))}
			  </ol>
			</div>
		)
}

SearchBooksResults.propTypes = {
		result: PropTypes.array.isRequired,
		onMoveToShelf: PropTypes.func.isRequired,
		book_ids: PropTypes.object.isRequired
}

export default SearchBooksResults