import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';
import { deleteBook, activateSceen, openBook } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, bindActionCreators } from 'redux';
import { getData } from "../actions/index";

interface IProps {
  books: Book[];
  reload: boolean;
  deleteBook: (isbn: string) => any;
  changeSceen: (sceen: string) => Object;
  BookOpener: (book: Book) => any;
  getData: () => any;
}

export class BooksList extends React.Component<IProps>{

  componentDidMount(){
    this.props.getData();
  };

  componentWillReceiveProps(nextProps: IProps){
    if(nextProps.reload){
      this.props.getData();
    }
  }

  handleDelete(isbn: string){
    this.props.deleteBook(isbn);
  }

  handleUpdate(book: Book){
    this.props.BookOpener(book);
    this.props.changeSceen("NewBook");
  }

  render() {
    return <ul className="list-group list-group-flush">
      {this.props.books.map((el: Book) => (
        <div style={{display: "block", margin: "10px", border: "1px solid #ccc", borderRadius: "10px"}}>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>ISBN :</div>
            <div style={{flex: 1}}>{el.isbn}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Title :</div>
            <div style={{flex: 1}}>{el.title}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Subtitle :</div>
            <div style={{flex: 1}}>{el.subtitle}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Author Name :</div>
            <div style={{flex: 1}}>{el.author}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Published On :</div>
            <div style={{flex: 1}}>{el.published}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Publisher :</div>
            <div style={{flex: 1}}>{el.publisher}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Pages :</div>
            <div style={{flex: 1}}>{el.pages}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Description :</div>
            <div style={{flex: 1}}>{el.description}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 0.25}}>Website Link :</div>
            <div style={{flex: 1}}>{el.website}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{flex: 1}} onClick={this.handleDelete.bind(this, el.isbn)}><button>Delete</button></div>
            <div style={{flex: 1}} onClick={this.handleUpdate.bind(this, el)}><button>Update</button></div>
          </div>

        </div>
      ))}
    </ul>
  }
};

const mapStateToProps = (state: StoreState) => {
  return {
    books: state.books,
    reload: state.reload
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    deleteBook: bindActionCreators(deleteBook, dispatch),
    changeSceen: (sceen: string) => dispatch(activateSceen(sceen)),
    BookOpener: (book: Book) => dispatch(openBook(book)),
    getData: bindActionCreators(getData, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
