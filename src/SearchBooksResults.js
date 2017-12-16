import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooksResults extends React.Component {
	static propTypes = {
		query: PropTypes.string.isRequired,
		book_ids: PropTypes.object.isRequired,
		onMoveToShelf: PropTypes.func.isRequired

	}
	state = {
		result: []
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.query !== this.props.query && this.props.query !== '') {
			console.log(this.props.query)
			BooksAPI.search(this.props.query).then((result) => {
				result.forEach(book => {
					book['shelf'] = this.props.book_ids[book.id]
				})
				this.setState({result})
			})
		}
	}

	render() {
		const {result} = this.state
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