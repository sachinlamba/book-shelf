import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';
import { addBook, activateSceen, updateBook } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, bindActionCreators } from 'redux';

interface IProps {
  books: Book[];
  newBookCheck: Boolean;
  bookToUpdate: Book | any;
  postBook: (book: Book) => any;
  putBook: (book: Book) => any;
  changeSceen: (sceen: string) => Object;
}

interface IState{
  isbn: string,
  title: string,
  subtitle: string,
  author: string,
  published: string,
  publisher: string,
  pages: number,
  description?: string,
  website?: string
}

export class AddBook extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    if(props.newBookCheck){
      this.state = {
        "isbn": "",
        "title": "",
        "subtitle": "",
        "author": "",
        "published": "",
        "publisher": "",
        "pages": 0,
        "description": "",
        "website": ""
      };
    }else{
      this.state = props.bookToUpdate;
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  };

  handleAdd() {
    this.props.postBook({
         isbn: this.state.isbn,
         title: this.state.title,
         subtitle: this.state.subtitle,
         author: this.state.author,
         published: this.state.published,
         publisher: this.state.publisher,
         pages: this.state.pages,
         description: this.state.description,
         website: this.state.website
     });
     this.props.changeSceen("Home");
  }

  handleUpdate() {
    this.props.putBook({
         isbn: this.state.isbn,
         title: this.state.title,
         subtitle: this.state.subtitle,
         author: this.state.author,
         published: this.state.published,
         publisher: this.state.publisher,
         pages: this.state.pages,
         description: this.state.description,
         website: this.state.website
     });
     this.props.changeSceen("Home");
  }

  changeHandler(event: { target: { name: any; value: any; }; }) {
    //https://stackoverflow.com/questions/55729742/react-typescript-argument-of-type-x-number-any-is-not-assignable-to
      const name = event.target.name;
      const value = event.target.value;
      const newState = { [name]: value } as Pick<IState, keyof IState>;
      this.setState(newState);
  }

  render() {
    return <div className="book-adder">
      <div className="list-title">Fill Book Details</div>
      <div className="book-individual">
        <div className="book-option">
          <div className="book-field">ISBN :</div>
          <div className="book-details"><input disabled={!this.props.newBookCheck} value={this.state.isbn} onChange={this.changeHandler} type="text" name="isbn"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Title :</div>
          <div className="book-details"><input value={this.state.title} onChange={this.changeHandler} type="text" name="title"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Subtitle :</div>
          <div className="book-details"><input value={this.state.subtitle} onChange={this.changeHandler} type="text" name="subtitle"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Author Name :</div>
          <div className="book-details"><input value={this.state.author} onChange={this.changeHandler} type="text" name="author"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Published On :</div>
          <div className="book-details"><input value={this.state.published} onChange={this.changeHandler} type="date" name="published"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Publisher :</div>
          <div className="book-details"><input value={this.state.publisher} onChange={this.changeHandler} type="text" name="publisher"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Pages :</div>
          <div className="book-details"><input value={this.state.pages} onChange={this.changeHandler} type="number" name="pages"/></div>
        </div>
        <div className="book-option">
          <div className="book-field">Description :</div>
          <div className="book-details"><textarea rows={6} cols={60} onChange={this.changeHandler} name="description">{this.state.description}</textarea></div>
        </div>
        <div className="book-option">
          <div className="book-field">Website Link :</div>
          <div className="book-details"><input value={this.state.website} onChange={this.changeHandler} type="text" name="website"/></div>
        </div>
      </div>
      {
        this.props.newBookCheck ?
        <div>
          <button onClick={this.handleAdd}>Add</button>
        </div>
        :
        <div>
          <button onClick={this.handleUpdate}>Update</button>
        </div>
      }

    </div>
  }
};

const mapStateToProps = (state: StoreState) => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postBook: bindActionCreators(addBook, dispatch),
    putBook: bindActionCreators(updateBook, dispatch),
    changeSceen: (sceen: string) => dispatch(activateSceen(sceen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
