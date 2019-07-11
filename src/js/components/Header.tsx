import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';
import { addBook, activateSceen, openBook } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

interface IProps {
  changeSceen: (sceen: string) => Object;
  BookOpener: (empty: string) => any;
  pageActive: string;
}

export class Header extends React.Component<IProps>{
  changeHandler(sceen: string) {
    if(this.props.pageActive != sceen){
      this.props.BookOpener("new");
      this.props.changeSceen(sceen);
    }

  }

  render() {
    return <div className="Header">
      <div className={"Header-Child " + (this.props.pageActive != "Home" ? "Header-enable" : "")} onClick={this.changeHandler.bind(this, "Home")}>Home</div>
      <div className={"Header-Child " + (this.props.pageActive != "NewBook" ? "Header-enable" : "")} onClick={this.changeHandler.bind(this, "NewBook")}>Add a Book</div>
    </div>
  }
};

const mapStateToProps = (store: StoreState) => {
  return {
    pageActive: store.pageActive,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    changeSceen: (sceen: string) => dispatch(activateSceen(sceen)),
    BookOpener: (empty: string) => dispatch(openBook(empty))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
