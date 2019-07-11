import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';
import { addBook, activateSceen } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import AddBook from './AddBook';

interface IProps {
  books: Book[];
}

interface IState{
  noOfBooks: number;
}

export class AddBooks extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      noOfBooks: 1
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.setState({
         noOfBooks: this.state.noOfBooks+1
     });
  }

  render() {
    let books = [];
    // React.ComponentType<AddBook> booksAddedTillNow = [];
    let i = 1;
    for(; i <= this.state.noOfBooks; i++){
      books.push(<AddBook bookNumber={i}/>);
    }
    return <div>
      <h2>Fill Book Details</h2>
      { books }
      <div>
        <button onClick={this.handleClick}>+</button>
      </div>
      <div>
        <button onClick={this.handleClick}>Add</button>
      </div>
    </div>
  }
};

const mapStateToProps = (state: StoreState) => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(AddBooks);
