import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../state/reducers/appInitialState';
import Book from '../../models/Book';
import {RouterPaths} from '../Main';
import BookForm from '../../components/bookForm/BookForm';
import AppCreator from '../../state/creators/app.creator';
import KeyGenerator from '../../utils/KeyGenerator';

const UpdateBook = () => {
    const {id} = useParams(),
        book: Book = useSelector((state: AppStateType) => state.books[id || -1]);

    if (!book) window.location.href = RouterPaths.Books;

    const [requestId, setRequestId] = useState(KeyGenerator.generateNextKey()),
        dispatch = useDispatch();

    useEffect(() => {
        setRequestId(KeyGenerator.generateNextKey());
    }, [book]);

    const updateBook = (updatedBook: Book) => {
        dispatch(AppCreator.updateBookRequest(updatedBook, requestId));
    };

    return <BookForm onSubmit={updateBook} book={book} createForm={false} requestId={requestId}/>;
};

export default UpdateBook;
