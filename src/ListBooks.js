import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends React.Component {
	static propTypes={
		books: PropTypes.array.isRequired
	}

	filterBooksBy = (contacts, shelf) => (contacts.filter((c) => c.shelf === shelf))
	categorizeBooks = (books, categories) => ({
			wantToRead: this.filterBooksBy(books, 'wantToRead'),
		  currentlyReading: this.filterBooksBy(books, 'currentlyReading'),
			read: this.filterBooksBy(books, 'read')
	}) 
	makeTitles = () => ({
		wantToRead: 'Want To Read',
		currentlyReading: 'Currently Reading',
		read: 'Read'
	})
	
	render() {
		const { books } = this.props
		const categories = ['currentlyReading', 'wantToRead', 'read']
		const books_by_category = this.categorizeBooks(books)
		const titleByCategory = this.makeTitles()

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
		            		{books_by_category[category].map((book) => (
		            			<Book key={book.id} book={book}/>
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