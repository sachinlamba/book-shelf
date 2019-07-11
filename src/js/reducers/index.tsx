import { StoreState, ActionPayload } from '../types/index';
import { ADD_BOOK, ADD_BOOKS, ACTIVATE_SCEEN, BOOK_LIST,
  OPEN_BOOK, DELETE_BOOK, UPDATE_BOOK, HIDE_POPUP } from "../constants/action-types";

const initialState = {
  //https://gist.github.com/nanotaboada/6396437
  "books": [],
  "user": "admin",
  "pageActive": "Home",
  "openBook": "new",
  "reload": true,
  "popupShow": false,
  "popupMessage": ""
};

function rootReducer(state: StoreState = initialState, action: ActionPayload):StoreState {
  switch(action.type){
    case BOOK_LIST:
      return Object.assign({}, state, {
        books: action.payload,
        "reload": false
      });
    case OPEN_BOOK:
      return Object.assign({}, state, {
        openBook: action.payload
      });
    case ADD_BOOK:
      return Object.assign({}, state, {
        books: state.books.concat(action.payload),
        "reload": true,
        "popupShow": true,
        "popupMessage": action.payload
      });
    case DELETE_BOOK:
      return Object.assign({}, state, {
        "reload": true,
        "popupShow": true,
        "popupMessage": action.payload
      });
    case UPDATE_BOOK:
      return Object.assign({}, state, {
        "reload": true,
        "popupShow": true,
        "popupMessage": action.payload
      });
    case HIDE_POPUP:
      return Object.assign({}, state, {
        "popupShow": false,
        "popupMessage": ""
      });
    case ACTIVATE_SCEEN:
      let newState = {
        "pageActive": action.payload,
        "reload": false
      };
      if(action.payload == "Home")
        newState.reload = true;
      return Object.assign({}, state, newState);
    default:
      console.log("No action update defined for", action.type);
  }

  return state;
};
export default rootReducer;
