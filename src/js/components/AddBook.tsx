import React from "react";
import { connect } from "react-redux";
import { StoreState, Books, Book } from '../types/index';

interface IProps {
  books: Book[]
}

const AddBook: React.FC<IProps> = ({
  books
}) => {
  return <ul className="list-group list-group-flush">
      {books.map((el: Book) => (
        <li key={el.id}>
          {el.title}
        </li>
      ))}
    </ul>
};

const mapStateToProps = (state: StoreState) => {
  debugger
  return { books: state.books };
};

export default connect(mapStateToProps)(AddBook);
