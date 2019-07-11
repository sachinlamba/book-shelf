import React from 'react';
import './App.css';
import BooksList from "./js/components/BooksList";
import AddBook from "./js/components/AddBook";
import Header from "./js/components/Header";
import { connect } from "react-redux";
import { StoreState, Books, Book } from './js/types/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, bindActionCreators } from 'redux';
import { activateSceen, hide_popup } from './js/actions/index';

interface IProps {
  pageActive: string;
  popupShow: Boolean;
  books: Book[];
  bookToUpdate: Book | string;
  newBookCheck: Boolean;
  changeSceen: (sceen: string) => Object;
  hide_popup: () => Object;
  popupMessage: string;
}

interface IState{
  pageActive: string;
}

export class App extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      pageActive: props.pageActive
    };
  };

  hidePopup(){
    this.props.hide_popup()
  }

   render() {
     let page = [];
     switch(this.props.pageActive){
       case "Home":
          page.push(
              <BooksList />
          );
          break;
        case "NewBook":
          page.push(
                <AddBook newBookCheck={this.props.newBookCheck} bookToUpdate={this.props.bookToUpdate}/>
          );
          break;
        default:
          page.push(<div>Wrong page active</div>)
     }
     return (
      <div className="App">
      {
        this.props.popupShow &&
        <div className="popup">
          <div className="blur-background"></div>,
          <div className="preview-div">
                  <div title="Close" className="cross-button" onClick={this.hidePopup.bind(this)}>&times;</div>
                  <div className="message-text">{this.props.popupMessage}</div>
                  <div className="horizontal-line"></div>
                  <div className="footer-buttons" >
                    <div className="button-style save-button" onClick={this.hidePopup.bind(this)}>Ok</div>
                  </div>
                </div>
        </div>
      }
      <Header />
      { page }
      </div>
    );
  }
}

const mapStateToProps = (store: StoreState) => {
  return {
    books: store.books,
    pageActive: store.pageActive,
    bookToUpdate: store.openBook,
    newBookCheck: store.openBook == "new",
    popupShow: store.popupShow,
    popupMessage: store.popupMessage
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    changeSceen: (sceen: string) => dispatch(activateSceen(sceen)),
    hide_popup: () => dispatch(hide_popup())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
