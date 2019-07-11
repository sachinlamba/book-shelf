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
    return <div className="book-list">
      <div className="list-title">Books Shelf</div>
      {this.props.books.map((el: Book) => (
        <div className="book-individual">
          <div className="book-option">
            <div className="book-field">ISBN :</div>
            <div className="book-details">{el.isbn}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Title :</div>
            <div className="book-details">{el.title}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Subtitle :</div>
            <div className="book-details">{el.subtitle}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Author Name :</div>
            <div className="book-details">{el.author}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Published On :</div>
            <div className="book-details">{el.published}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Publisher :</div>
            <div className="book-details">{el.publisher}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Pages :</div>
            <div className="book-details">{el.pages}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Description :</div>
            <div className="book-details">{el.description}</div>
          </div>
          <div className="book-option">
            <div className="book-field">Website Link :</div>
            <div className="book-details">{el.website}</div>
          </div>
          <div className="book-option">
            <div className="book-details" onClick={this.handleDelete.bind(this, el.isbn)}><button>Delete</button></div>
            <div className="book-details" onClick={this.handleUpdate.bind(this, el)}><button>Update</button></div>
          </div>

        </div>
      ))}
    </div>
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
