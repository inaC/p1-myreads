import React from 'react'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		books: PropTypes.array.isRequired,
		showSearchPage: PropTypes.func.isRequired,
		onMoveToShelf: PropTypes.func.isRequired
	}
			
	filterBooksBy = (books, shelf) => (books.filter((c) => c.shelf === shelf))
	
	booksByShelf = (shelf) => this.filterBooksBy(this.props.books, shelf)
	
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
	        					 onMoveToShelf={this.props.onMoveToShelf}/>
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