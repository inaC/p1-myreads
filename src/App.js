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
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  
  onMoveToShelf = (book_to_move, shelf_to_move) => {
    console.log('onMoveToShelf called!')
    console.log(book_to_move)
    BooksAPI.update(book_to_move, shelf_to_move).then((result) => {
      console.log('moving book...')
      let books = this.state.books
      const shelves = Object.keys(result)
      if(!books.map(book=> book.id).includes(book_to_move.id)) {
        books.push(book_to_move)
      }

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
