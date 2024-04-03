import React from 'react';
import BookForm from "../../components/bookForm/BookForm";
import Book from "../../models/Book";

interface BookFormProps {
    onSubmit: Function;
}

const UpdateBook = ({onSubmit}: BookFormProps) => {
    const emptyBook: Book = {
        _id: "",
        title: "",
        price: 0,
        authors: []
    }

    return (
        <BookForm onSubmit={onSubmit} book={emptyBook}/>
    );
};

export default UpdateBook;
