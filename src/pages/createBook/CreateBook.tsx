import React, {useEffect, useState} from 'react';
import BookForm from "../../components/bookForm/BookForm";
import Book, {BooksCollection, getEmptyBook} from "../../models/Book";
import AppCreator from "../../state/creators/app.creator";
import {useDispatch, useSelector} from "react-redux";
import KeyGenerator from "../../utils/KeyGenerator";
import {AppStateType} from "../../state/reducers/appInitialState";

const CreateBook = () => {
    const dispatch = useDispatch(),
        [newBook, setNewBook] = useState(getEmptyBook()),
        [requestId, setRequestId] = useState(KeyGenerator.generateNextKey),
        books: BooksCollection = useSelector((state: AppStateType) => state.books);

    useEffect(() => {
        if (books[newBook._id]) setRequestId(KeyGenerator.generateNextKey);
    }, [books, newBook._id]);

    const createBook = (book: Book) => {
        dispatch(AppCreator.createBookRequest(book, requestId));
        setNewBook(book);
    };

    return (
        <BookForm onSubmit={createBook} book={getEmptyBook()} createForm={true} requestId={requestId}/>
    );
};

export default CreateBook;
