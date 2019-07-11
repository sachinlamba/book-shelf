import { ADD_BOOK, ACTIVATE_SCEEN, OPEN_BOOK, HIDE_POPUP } from "../constants/action-types";
import { ActionPayload, Book } from '../types/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

export function activateSceen(payload: string): ActionPayload {
  return {
    type: ACTIVATE_SCEEN,
    payload
  }
};

export function openBook(book: Book | string): ActionPayload {
  return {
    type: OPEN_BOOK,
    payload: book
  }
};

export function hide_popup(): ActionPayload {
  return {
    type: HIDE_POPUP
  }
};

export function addBook(book: Book) {
  return function(dispatch : ThunkDispatch<any, any, AnyAction>) {
    return fetch("http://localhost:3001/books/", {
             method: 'post',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify({data: book})
          })
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "ADD_BOOK", payload: json.message });
      })
      .catch(error => dispatch({
        type: 'BOOK_INSERT_FAILED',
        error
      }));
  };
};

export function updateBook(book: Book) {
  return function(dispatch : ThunkDispatch<any, any, AnyAction>) {
    return fetch("http://localhost:3001/books/"+book.isbn, {
             method: 'put',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify({data: book})
          })
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "UPDATE_BOOK", payload: json.message });
      })
      .catch(error => dispatch({
        type: 'BOOK_UPDATE_FAILED',
        error
      }));
  };
};

export function deleteBook(isbn: string) {
  return function(dispatch : ThunkDispatch<any, any, AnyAction>) {
    return fetch("http://localhost:3001/books/"+isbn, {
             method: 'delete'
          })
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DELETE_BOOK", payload: json.message });
      })
      .catch(error => dispatch({
        type: 'BOOK_DELETE_FAILED',
        error
      }));
  };
};

export function getData() {
  return function(dispatch : ThunkDispatch<any, any, AnyAction>) {
    return fetch("http://localhost:3001/books")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "BOOK_LIST", payload: json });
      })
      .catch(error => dispatch({
        type: 'FETCH_BOOK_FAILED',
        error
      }));
  };
}
