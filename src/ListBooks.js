import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		showSearchPage: PropTypes.bool.isRequired
	}
	
	state = {
		books: [],
		booksByShelf: {}
	}

	componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  
  onMoveToShelf = (book_id, shelf) => {
    shelf === 'none' || BooksAPI.update(book_id, shelf).then((booksByShelf) => BooksAPI.getAll().then((books) => this.setState({ books, booksByShelf })))
  }
	
	filterBooksBy = (books, shelf) => (books.filter((c) => c.shelf === shelf))
	
	booksByCategory = (category) => this.filterBooksBy(this.state.books, category)

	makeTitles = () => ({
		wantToRead: 'Want To Read',
		currentlyReading: 'Currently Reading',
		read: 'Read'
	})	
	
	render() {
		const categories=['currentlyReading', 'wantToRead', 'read']
		const titleByCategory=this.makeTitles()
		const booksByCategory=this.booksByCategory

		return (
	    <div className="list-books">
	      <div className="list-books-title">
	        <h1>MyReads</h1>
	      </div>
	      <div className="list-books-content">
	        <div>
	        	{categories.map((category) => (
		          <div className="bookshelf" key={category}>
		            <h2 className="bookshelf-title"> {titleByCategory[category]} </h2>
		            <div className="bookshelf-books">
		            	<ol className="books-grid">
		            		{booksByCategory(category).map((book) => (
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