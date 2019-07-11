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
interface IState{
  searchText: string;
  searchField: string;
}

export class BooksList extends React.Component<IProps, IState>{
  constructor(props: IProps){
    super(props);
    this.state = {
      searchText: "",
      searchField: "isbn"
    }
    this.searchTextUpdate = this.searchTextUpdate.bind(this);
  }
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

  searchTextUpdate(event: { target: { name: any; value: any; }; }) {
    //https://stackoverflow.com/questions/55729742/react-typescript-argument-of-type-x-number-any-is-not-assignable-to
      const name = event.target.name;
      const value = event.target.value;
      const newState = { [name]: value } as Pick<IState, keyof IState>;
      this.setState(newState);
  }

  searchFieldUpdate(field: string) {
      this.setState({
        searchField: field
      });
  }

  render() {
    return <div className="book-list">
      <div className="list-title">Books Shelf</div>
      <div>
      <div className="input-div">
        <input className="input-field" placeholder="Enter as per field selected..." type="text" name="searchText" onChange={this.searchTextUpdate} value={this.state.searchText}/>
      </div>
        <div className="book-finder">
            <div className={"field " + (this.state.searchField == "isbn" ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "isbn")}>
              <input type="radio" checked={this.state.searchField == "isbn"} /> ISBN
            </div>
          <div className={"field " + (this.state.searchField == "title" ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "title")}>
            <input type="radio" checked={this.state.searchField == "title"} /> Title
          </div>
          <div className={"field " + (this.state.searchField == "subtitle" ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "subtitle")}>
            <input type="radio" checked={this.state.searchField == "subtitle"} /> Subtitle
          </div>
          <div className={"field " + (this.state.searchField == "author" ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "author")}>
            <input type="radio" checked={this.state.searchField == "author"} /> Author Name
          </div>
          <div className={"field " + (this.state.searchField == "publisher" ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "publisher")}>
            <input type="radio" checked={this.state.searchField == "publisher"} /> Publisher
          </div>
          {
            // <input type="radio" checked={this.state.searchField == "published"} onClick={this.searchFieldUpdate.bind(this, "published")} /> Published On
            // <input type="radio" checked={this.state.searchField == "pages"} onClick={this.searchFieldUpdate.bind(this, "pages")} /> Pages
          }
          <div className={"field " + (this.state.searchField == "description" ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "description")}>
            <input type="radio" checked={this.state.searchField == "description"} /> Description
          </div>
          <div className={"field " + (this.state.searchField == "website  " ? "active-field" : "")} onClick={this.searchFieldUpdate.bind(this, "website")}>
            <input type="radio" checked={this.state.searchField == "website"} /> Website Link
          </div>
        </div>
      </div>
      {
        this.props.books.map((el: any) => {
            let desc = String(el[this.state.searchField]).toLowerCase(), searchText = this.state.searchText.toLowerCase();
            if(!desc.includes(searchText)){
              return false;
            }
            return <div className="book-individual">
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
                <div className="book-details"><button onClick={this.handleDelete.bind(this, el.isbn)}>Delete</button></div>
                <div className="book-details"><button onClick={this.handleUpdate.bind(this, el)}>Update</button></div>
              </div>

            </div>
          }
        )
      }
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
