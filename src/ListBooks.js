import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		showSearchPage: PropTypes.bool.isRequired
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

	makeTitles = () => ({
		wantToRead: 'Want To Read',
		currentlyReading: 'Currently Reading',
		read: 'Read'
	})	
	
	render() {
		const shelves=['currentlyReading', 'wantToRead', 'read']
		const titleByShelf=this.makeTitles()
		const booksByShelf=this.booksByShelf

		return (
	    <div className="list-books">
	      <div className="list-books-title">
	        <h1>MyReads</h1>
	      </div>
	      <div className="list-books-content">
	        <div>
	        	{shelves.map((shelf) => (
		          <div className="bookshelf" key={shelf}>
		            <h2 className="bookshelf-title"> {titleByShelf[shelf]} </h2>
		            <div className="bookshelf-books">
		            	<ol className="books-grid">
		            		{booksByShelf(shelf).map((book) => (
		            			<Book key={book.id} book={book} onSelect={this.onMoveToShelf}/>
		            			))}
		            	</ol>
		            </div>
		          </div>)
	        	)}
	        </div>
	      </div>	
	    </div>	
		)
	}
}

export default ListBooks