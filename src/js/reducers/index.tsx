import { StoreState, ActionPayload } from '../types/index';
import { ADD_BOOK, ADD_BOOKS } from "../constants/action-types";

const initialState = {
  books: [
    {
       id: 1,
       title: "A",
       author: "B",
       price: 1,
       publishedOn: "01-01-2018"
   },
   {
      id: 2,
      title: "AA",
      author: "BB",
      price: 12,
      publishedOn: "02-02-2018"
  },
  {
     id: 3,
     title: "AAA",
     author: "BBB",
     price: 123,
     publishedOn: "03-03-2018"
 }
  ],
  user: "admin"
};

function rootReducer(state: StoreState = initialState, action: ActionPayload):StoreState {

  switch(action.type){
    case ADD_BOOK:
      return Object.assign({}, state, {
        books: state.books.concat(action.payload)
      });
      break;
    default:
      console.log("No action update defined for", action.type);
  }

  return state;
};
export default rootReducer;
