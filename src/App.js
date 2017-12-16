import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }
  
  onSearchBooks = (show) => this.setState({ showSearchPage: show })
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  
  onMoveToShelf = (book_to_update, new_shelf) => {
    console.log('chamado!')
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
  render() {
    const books = this.state.books
    let book_ids = {}
    books.forEach(book => {book_ids[book.id] = book.shelf})
    return (
      <div className="app">
        {this.state.showSearchPage ? 
          <SearchBooks book_ids={book_ids} onMoveToShelf={this.onMoveToShelf} showSearchPage={this.onSearchBooks}/> :
          <ListBooks books={books} showSearchPage={this.onSearchBooks} onMoveToShelf={this.onMoveToShelf}/>
        }
      </div>
    )
  }
}

export default BooksApp
