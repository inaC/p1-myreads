import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		showSearchPage: PropTypes.func.isRequired
	}
	
	state = {
		books: []
	}
	
	componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  
  onMoveToShelf = (book_to_update, new_shelf) => {
    new_shelf === 'none' || BooksAPI.update(book_to_update, new_shelf).then((result) => {
			let books = this.state.books
			const shelves = Object.keys(result)

			shelves.forEach(shelf => {
				result[shelf].forEach(book_id => {
					books.forEach(book => {
						book.shelf = (book.id === book_id) ? shelf : book.shelf 
					})
				})
			})
    	this.setState({ books })
    })
  }
	
	filterBooksBy = (books, shelf) => (books.filter((c) => c.shelf === shelf))
	
	booksByShelf = (shelf) => this.filterBooksBy(this.state.books, shelf)
	
	render() {
		const shelves=['currentlyReading', 'wantToRead', 'read']
		const titleByShelf = {
			wantToRead: 'Want To Read',
			currentlyReading: 'Currently Reading',
			read: 'Read'
		}
		const booksByShelf=this.booksByShelf
		
		return (
	    <div className="list-books">
	      <div className="list-books-title">
	        <h1>MyReads</h1>
	      </div>
	      <div className="list-books-content">
	        <div>
	        	{shelves.map(shelf => (
	        		<Shelf key={shelf} 
	        					 name={shelf}
	        					 title={titleByShelf[shelf]}
	        					 books={booksByShelf(shelf)}
	        					 onMoveToShelf={this.onMoveToShelf}/>
	        	))}
	        </div>
	      </div>	
	      <div className="open-search">
	        <a title="Add a book" onClick={() => this.props.showSearchPage(true)}></a>
	      </div>	    
	     </div>	
		)
	}
}

export default ListBooks