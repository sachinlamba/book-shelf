import { StoreState, ActionPayload } from '../types/index';
import { ADD_BOOK, ADD_BOOKS, ACTIVATE_SCEEN, BOOK_LIST } from "../constants/action-types";

const initialState = {
  //https://gist.github.com/nanotaboada/6396437
  "books": [],
  "user": "admin",
  "pageActive": "Home"
};

function rootReducer(state: StoreState = initialState, action: ActionPayload):StoreState {

  switch(action.type){
    case BOOK_LIST:
      return Object.assign({}, state, {
        books: action.payload
      });
      break;
    case ADD_BOOK:
      return Object.assign({}, state, {
        books: state.books.concat(action.payload)
      });
      break;
    case ACTIVATE_SCEEN:
      return Object.assign({}, state, {
        pageActive: action.payload
      });
      break;
    default:
      console.log("No action update defined for", action.type);
  }

  return state;
};
export default rootReducer;
