import Book, {BooksCollection} from "../../models/Book";
import AppActions from "../actions/app.actions";
import {AuthorsCollection} from "../../models/Author";
import RequestError from "../../models/RequestError";

const setBooks = (books: BooksCollection, ttl: number) => ({type: AppActions.SET_BOOKS, books, ttl}),
    setAuthors = (authors: AuthorsCollection, ttl: number) => ({type: AppActions.SET_AUTHORS, authors, ttl}),
    deleteBookRequest = (bookId: number) => ({type: AppActions.DELETE_BOOK_REQUEST, bookId}),
    deleteBook = (bookId: number) => ({type: AppActions.DELETE_BOOK, bookId}),
    createBookRequest = (book: Book, requestId: string) => ({type: AppActions.CREATE_BOOK_REQUEST, book, requestId}),
    createBook = (book: Book) => ({type: AppActions.CREATE_BOOK, book}),
    updateBookRequest = (book: Book, requestId: string) => ({type: AppActions.UPDATE_BOOK_REQUEST, book, requestId}),
    updateBook = (book: Book) => ({type: AppActions.UPDATE_BOOK, book}),
    addError = (error: RequestError, requestId: string) => ({type: AppActions.ADD_ERROR, error, requestId});

const AppCreator = {
    setBooks,
    setAuthors,
    deleteBookRequest,
    deleteBook,
    createBookRequest,
    createBook,
    updateBookRequest,
    updateBook,
    addError
};

export default AppCreator;