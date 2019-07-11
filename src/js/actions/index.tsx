import { ADD_BOOK, ACTIVATE_SCEEN } from "../constants/action-types";
import { ActionPayload, Book } from '../types/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

export function addBook(payload: Book): ActionPayload {
  return {
    type: ADD_BOOK,
    payload
  }
};

export function activateSceen(payload: String): ActionPayload {
  return {
    type: ACTIVATE_SCEEN,
    payload
  }
};

export function getData() {
  debugger
  return function(dispatch : ThunkDispatch<any, any, AnyAction>) {
    return fetch("http://localhost:3001/books")
      .then(response => response.json())
      .then(json => {
        debugger
        dispatch({ type: "BOOK_LIST", payload: json });
      })
      .catch(error => dispatch({
        type: 'FETCH_COMIC_FAILED',
        error
      }));
  };
}
