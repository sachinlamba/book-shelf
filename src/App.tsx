import React from 'react';
import './App.css';
import BooksList from "./js/components/BooksList";
import AddBook from "./js/components/AddBook";
import Header from "./js/components/Header";
import { connect } from "react-redux";
import { StoreState, Books, Book } from './js/types/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, bindActionCreators } from 'redux';
import { activateSceen } from './js/actions/index';
import { getData } from "./js/actions/index";

interface IProps {
  pageActive: String;
  books: Book[];
  changeSceen: (sceen: String) => Object;
  getData: () => any;
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
  };

  componentDidMount(){
    this.props.getData();
  };

   render() {
     let page = [];
     switch(this.props.pageActive){
       case "Home":
          page.push(
              <div>
              <h2>Books Shelf</h2>
              <BooksList />
            </div>
          );
          break;
        case "NewBook":
          page.push(
              <div><AddBook /></div>
          );
          break;
        default:
          page.push(<div>Wrong page active</div>)
     }
     return (
      <div className="App">
      <Header />
      { page }
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
    changeSceen: (sceen: String) => dispatch(activateSceen(sceen)),
    getData: bindActionCreators(getData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
