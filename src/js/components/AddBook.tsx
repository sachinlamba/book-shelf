import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';
import { addBook, activateSceen } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

interface IProps {
  books: Book[];
  postBook: (book: Book) => Object;
  changeSceen: (sceen: String) => Object;
}
interface IState{
  isbn: String,
  title: String,
  subtitle: String,
  author: String,
  published: String,
  publisher: String,
  pages: number,
  description?: String,
  website?: String
}

export class AddBook extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      "isbn": "9781449337711",
      "title": "Designing Evolvable Web APIs with ASP.NET",
      "subtitle": "Harnessing the Power of the Web",
      "author": "Glenn Block, et al.",
      "published": "2014-04-07T00:00:00.000Z",
      "publisher": "O'Reilly Media",
      "pages": 538,
      "description": "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.",
      "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html"
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
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

  render() {
    return <div>
      <h2>Fill Book Details</h2>
      <div style={{display: "block", margin: "10px", border: "1px solid #ccc", borderRadius: "10px"}}>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>ISBN :</div>
          <div style={{flex: 1}}><input type="string" id="isbn"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Title :</div>
          <div style={{flex: 1}}><input type="string" id="title"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Subtitle :</div>
          <div style={{flex: 1}}><input type="string" id="subtitle"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Author Name :</div>
          <div style={{flex: 1}}><input type="string" id="author"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Published On :</div>
          <div style={{flex: 1}}><input type="date" id="published"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Publisher :</div>
          <div style={{flex: 1}}><input type="number" id="publisher"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Pages :</div>
          <div style={{flex: 1}}><input type="number" id="pages"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Description :</div>
          <div style={{flex: 1}}><input type="number" id="description"/></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>Website Link :</div>
          <div style={{flex: 1}}><input type="number" id="website"/></div>
        </div>
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postBook: (book: Book) => dispatch(addBook(book)),
    changeSceen: (sceen: String) => dispatch(activateSceen(sceen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
