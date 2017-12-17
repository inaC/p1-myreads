import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
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
      <BrowserRouter>
        <div className="app">
          <Route exact path='/'
            render={() => (
              <ListBooks books={books} onMoveToShelf={this.onMoveToShelf}/>
            )}
          />
          <Route path='/search'
            render={() => (
              <SearchBooks book_ids={book_ids} onMoveToShelf={this.onMoveToShelf}/>
            )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
