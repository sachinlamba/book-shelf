import React from 'react';
import './App.css';
import BooksList from "./js/components/BooksList";
import AddBook from "./js/components/AddBook";
import { connect } from "react-redux";
import { StoreState, Books, Book } from './js/types/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { activateSceen } from './js/actions/index';

interface IProps {
  pageActive: String;
  books: Book[];
  changeSceen: (sceen: String) => Object;
}

interface IState{
  pageActive: String;
}

export class App extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      pageActive: props.pageActive
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.props.changeSceen("Search");
  }

   render() {
     return (
      <div className="App">
      {
        this.props.pageActive == "Home" ?
          <div>
            <h2>Books Shelf</h2>
            <BooksList />
            <button onClick={this.handleClick}>Want to Add a Book?</button>
          </div>
        :
          <div><AddBook /></div>
      }
      </div>
    );
  }
}

const mapStateToProps = (store: StoreState) => {
  return {
    books: store.books,
    pageActive: store.pageActive
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    changeSceen: (sceen: String) => dispatch(activateSceen(sceen))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
