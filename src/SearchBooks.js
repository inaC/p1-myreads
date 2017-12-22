import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import SearchBooksResults from './SearchBooksResults'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {
	static propTypes = {
		onMoveToShelf: PropTypes.func.isRequired,
		book_ids: PropTypes.object.isRequired
	}
	
	state = {
		query: '',
		result: []
	}
	searchBooks = (query) => {
			this.setState({query})
			if(query !== '') this.getResult(query)
	}

	getResult(query) {
		BooksAPI.search(query).then((result) => {
			if(!result.error) {
				this.setState({result})
			}
		}).catch(() => console.log('uh-oh: books could not be retrieved from the api'))
	}

	render() {
		return (
			<div className="search-books">
			  <div className="search-books-bar">
			    <Link 
			    	className="close-search"
			    	title="Back to home page" 
			    	to='/'
			    	> Back to home page </Link>
			    <div className="search-books-input-wrapper">
			      <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.searchBooks(event.target.value)}/>
			    </div>
			  </div>
			  <SearchBooksResults query={this.state.query} book_ids={this.props.book_ids} result={this.state.result} onMoveToShelf={this.props.onMoveToShelf}/>
			</div>
		)
	}
}

export default SearchBooks