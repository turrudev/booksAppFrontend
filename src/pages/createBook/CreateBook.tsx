import React from 'react';
import BookForm from "../../components/bookForm/BookForm";
import Book from "../../models/Book";
import AppCreator from "../../state/creators/app.creator";
import {useDispatch} from "react-redux";

const CreateBook = () => {
    const dispatch = useDispatch(),
        emptyBook: Book = {
            _id: "",
            title: "",
            price: 1,
            authors: []
        };

    const createBook = (book: Book) => {
        dispatch(AppCreator.createBookRequest(book));
    };

    return (
        <BookForm onSubmit={createBook} book={emptyBook} createForm={true}/>
    );
};

export default CreateBook;
