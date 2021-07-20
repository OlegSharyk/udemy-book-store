import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import './book-list.css';
import { compose } from '../../utils';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();

    // const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;
    // booksRequested();
    // bookstoreService
    //   .getBooks()
    //   .then((data) => {
    //     booksLoaded(data);
    //   })
    //   .catch((error) => {
    //     booksError(error);
    //   });
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => ({
  books,
  loading,
  error,
});

// const mapDispatchToProps = (dispatch) => {
//   // return {
//   //   booksLoaded: (newBooks) => {
//   //     dispatch(booksLoaded(newBooks));
//   //   },
//   // };

//   return bindActionCreators(
//     {
//       booksLoaded,
//     },
//     dispatch,
//   );
// };

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError,
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    // fetchBooks: () => {
    //   // const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;

    //   dispatch(booksRequested());
    //   bookstoreService
    //     .getBooks()
    //     .then((data) => {
    //       dispatch(booksLoaded(data));
    //     })
    //     .catch((error) => {
    //       dispatch(booksError(error));
    //     });
    // },

    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
