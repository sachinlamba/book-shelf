import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';

interface IProps {
  books: Book[]
}

const BooksList: React.FC<IProps> = ({
  books
}) => {
  return <ul className="list-group list-group-flush">
      {books.map((el: Book) => (
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
        </div>
      ))}
    </ul>
};

const mapStateToProps = (state: StoreState) => {
  return { books: state.books };
};

export default connect(mapStateToProps)(BooksList);
