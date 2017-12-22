import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
	static propTypes={
		books: PropTypes.array.isRequired,
		onMoveToShelf: PropTypes.func.isRequired
	}
			
	filterBooksBy = (shelf) => (this.props.books.filter((b) => b.shelf === shelf))
		
	render() {
		const shelves = ['currentlyReading', 'wantToRead', 'read']
		const titleByShelf = {
			wantToRead: 'Want To Read',
			currentlyReading: 'Currently Reading',
			read: 'Read'
		}
		const filterBooksBy = this.filterBooksBy
		
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
	        					 books={filterBooksBy(shelf)}
	        					 onMoveToShelf={this.props.onMoveToShelf}
	        		/>
	        	))}
	        </div>
	      </div>	
	      <div className="open-search">
	        <Link 
	        	title="Add a book"
	        	to="/search"> Add a book 
	        </Link>
	      </div>	    
	     </div>	
		)
	}
}

export default ListBooks