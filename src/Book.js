import React from 'react'
import PropTypes from 'prop-types'

const Book = function(props) {
		const book = props.book
		const onMoveToShelf = props.onSelect

		return(
			<li>
			  <div className="book">
			    <div className="book-top">
			      {book.imageLinks ? 
			      	(<div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>):
			      	(<div className="book-cover not-found" title="Image not found"></div>)
			      }
			      <div className={`book-shelf-changer ${book.shelf === 'searching' ? 'searching' : 'moving'}`}>
			        <select 
			        	onChange={event => onMoveToShelf(book, event.target.value)} 
			        	value={book.shelf}>
			          <option 
			          	value="searching" 
			          	disabled>{book.shelf === 'searching' ? 'Add to...' : 'Move to...'}
			          </option>
			          <option value="currentlyReading">Currently Reading</option>
			          <option value="wantToRead">Want to Read</option>
			          <option value="read">Read</option>
			        </select>
			      </div>
			    </div>
			    <div className="book-title">{book.title}</div>
			    <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Author unavailable'}</div>
			  </div>
			</li>)
}

Book.propTypes = {
		book: PropTypes.object.isRequired,
		onSelect: PropTypes.func.isRequired
}

export default Book