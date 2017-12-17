import React from 'react'
import { Link } from 'react-router-dom'
import SearchBooksResults from './SearchBooksResults'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {
	static propTypes = {
		onMoveToShelf: PropTypes.func.isRequired,
		book_ids: PropTypes.object.isRequired
	}
	
	state = {
		query: ''
	}
	searchBooks = (query) => {
			this.setState({query})
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
			      {/*
			        NOTES: The search from BooksAPI is limited to a particular set of search terms.
			        You can find these search terms here:
			        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			        you don't find a specific author or title. Every search is limited by search terms.
			      */}
			      <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.searchBooks(event.target.value)}/>

			    </div>
			  </div>
			  <SearchBooksResults query={this.state.query} book_ids={this.props.book_ids} onMoveToShelf={this.props.onMoveToShelf}/>
			</div>
		)
	}
}

export default SearchBooks