import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';
import { addBook, activateSceen } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

interface IProps {
  changeSceen: (sceen: String) => Object;
}

export class Header extends React.Component<IProps>{
  changeHandler(sceen: string) {
      this.props.changeSceen(sceen);
  }

  render() {
    return <div style={{display: "flex"}}>
      <div style={{flex: 1, border: "1px solid #ccc", margin: "5px"}} onClick={this.changeHandler.bind(this, "Home")}>Home</div>
      <div style={{flex: 1, border: "1px solid #ccc", margin: "5px"}} onClick={this.changeHandler.bind(this, "NewBook")}>Add a Book</div>
    </div>
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    changeSceen: (sceen: String) => dispatch(activateSceen(sceen))
  };
};

export default connect(null, mapDispatchToProps)(Header);
