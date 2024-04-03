import {BooksCollection} from "../../models/Book";
import AppActions from "../actions/app.actions";
import {AuthorsCollection} from "../../models/Author";

const setBooks = (books: BooksCollection, ttl: number) => ({type: AppActions.SET_BOOKS, books, ttl}),
    setAuthors = (authors: AuthorsCollection, ttl: number) => ({type: AppActions.SET_AUTHORS, authors, ttl}),
    deleteBookRequest = (bookId: number) => ({type: AppActions.DELETE_BOOK_REQUEST, bookId}),
    deleteBook = (bookId: number) => ({type: AppActions.DELETE_BOOK, bookId});

const AppCreator = {
    setBooks,
    setAuthors,
    deleteBookRequest,
    deleteBook
};

export default AppCreator;