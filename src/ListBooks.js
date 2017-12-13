import React from 'react'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		books: PropTypes.array.isRequired
	}

	filterContactsBy = (contacts, shelf) => (contacts.filter((c) => c.shelf === shelf))
	categorizeBooks = (books, categories) => ({
			wantToRead: this.filterContactsBy(books, 'wantToRead'),
		  currentlyReading: this.filterContactsBy(books, 'currentlyReading'),
			read: this.filterContactsBy(books, 'read')
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
		            			<li key={book.id}>
		            			  <div className="book">
		            			    <div className="book-top">
		            			      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
		            			      <div className="book-shelf-changer">
		            			        <select defaultValue={category}>
		            			          <option value="none" disabled>Move to...</option>
		            			          <option value="currentlyReading">Currently Reading</option>
		            			          <option value="wantToRead">Want to Read</option>
		            			          <option value="read">Read</option>
		            			          <option value="none">None</option>
		            			        </select>
		            			      </div>
		            			    </div>
		            			    <div className="book-title">{book.title}</div>
		            			    <div className="book-authors">{book.authors.join(', ')}</div>
		            			  </div>
		            			</li>
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