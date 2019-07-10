import React from 'react';
import './App.css';
import BooksList from "./js/components/BooksList";
import { connect } from "react-redux";
import { StoreState, Books, Book } from './js/types/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

interface IProps {
  books: Book[];
  postBook: (book: Book) => String;
}

const App: React.FC<IProps> = ({
  books,
  postBook
}) => {

  const handleClick = () => {
    postBook({
         id: 4,
         title: "AAAA",
         author: "BBBB",
         price: 1234,
         publishedOn: "04-04-2018"
     });
  };

  return (
    <div className="App">
      <h2>Books Shelf</h2>
      <BooksList />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

const mapStateToProps = (store: StoreState) => {
  return {
    books: store.books
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postBook: (book: Book) => {
      console.log("Hi", book.title);
      return "HHH"
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
