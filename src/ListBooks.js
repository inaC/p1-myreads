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
		result: {}
	}

	componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  
  onMoveToShelf = (book_id, shelf) => {
    shelf === 'none' || BooksAPI.update(book_id, shelf).then((result) => BooksAPI.getAll().then((books) => this.setState({ books, result })))
  }
	
	filterBooksBy = (books, shelf) => (books.filter((c) => c.shelf === shelf))
	
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
		const { books } = this.state
		const categories=['currentlyReading', 'wantToRead', 'read']
		const books_by_category=this.categorizeBooks(books)
		const titleByCategory=this.makeTitles()

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
		            			<Book key={book.id} book={book} onSelect={this.onMoveToShelf}/>
		            			// <li key={book.id}>
		            			//   <div className="book">
		            			//     <div className="book-top">
		            			//       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
		            			//       <div className="book-shelf-changer">
		            			//         <select onChange={(event) => this.onMoveToShelf({id: book.id}, event.target.value)} value={book.shelf}>
		            			//           <option value="none" disabled>Move to...</option>
		            			//           <option value="currentlyReading">Currently Reading</option>
		            			//           <option value="wantToRead">Want to Read</option>
		            			//           <option value="read">Read</option>
		            			//           <option value="none">None</option>
		            			//         </select>
		            			//       </div>
		            			//     </div>
		            			//     <div className="book-title">{book.title}</div>
		            			//     <div className="book-authors">{book.authors.join(', ')}</div>
		            			//   </div>
		            			// </li>
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