import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/reducers/appInitialState";
import Book from "../../models/Book";
import {RouterPaths} from "../Main";
import BookForm from "../../components/bookForm/BookForm";
import AppCreator from "../../state/creators/app.creator";

const UpdateBook = () => {
    const {id} = useParams(),
        book: Book = useSelector((state: AppStateType) => state.books[id || -1]),
        dispatch = useDispatch();

    if (!book) window.location.href = RouterPaths.Books;

    const updateBook = (book: Book) => {
        dispatch(AppCreator.updateBookRequest(book));
    };

    return (
        <BookForm onSubmit={updateBook} book={book} createForm={false}/>
    );
};

export default UpdateBook;
