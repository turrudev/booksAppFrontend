import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from "../../state/reducers/appInitialState";
import Book from "../../models/Book";
import {RouterPaths} from "../Main";
import BookForm from "../../components/bookForm/BookForm";

interface BookFormProps {
    onSubmit: Function;
}

const UpdateBook = ({onSubmit}: BookFormProps) => {
    const {id} = useParams(),
        book: Book = useSelector((state: AppStateType) => state.books[id || -1]);

    if (!book) window.location.href = RouterPaths.Books;

    return (
        <BookForm onSubmit={onSubmit} book={book}/>
    );
};

export default UpdateBook;
