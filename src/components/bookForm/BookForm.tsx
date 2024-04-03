import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import {css, StyleSheet} from 'aphrodite';
import {useSelector} from "react-redux";
import {AppStateType} from "../../state/reducers/appInitialState";
import Book from "../../models/Book";
import {RouterPaths} from "../../pages/Main";
import {AuthorsCollection} from "../../models/Author";
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";

interface BookFormProps {
    onSubmit: Function
}

const BookForm = ({onSubmit}: BookFormProps) => {
    const {id} = useParams();
    const book: Book = useSelector((state: AppStateType) => state.books[id || -1]);

    if (!book) window.location.href = RouterPaths.Books;

    const translations = useContext(TranslationsContext),
        authors: AuthorsCollection = useSelector((state: AppStateType) => state.authors),
        [title, setTitle] = useState(book.title),
        [isbn, setIsbn] = useState(book._id),
        [price, setPrice] = useState(book.price.toString()),
        [selectedAuthors, setSelectedAuthors] = useState<string[]>(book.authors),
        bookTitle: string = translations.getMessage("bookTitle"),
        bookPrice: string = translations.getMessage("price"),
        isbnTranslation: string = translations.getMessage("isbn"),
        authorsTranslation: string = translations.getMessage("authors"),
        {theme} = useContext(ThemeContext);
    console.log(theme);
    const styles = StyleSheet.create({
        form: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
            margin: '10px auto',
        },
        label: {
            marginBottom: '5px',
            fontSize: '16px',
        },
        input: {
            padding: '10px',
            marginBottom: '20px',
            fontSize: '16px',
            border: `1px solid ${theme.bookForm.inputBorderColor}`,
            borderRadius: '5px',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
        },
        selectContainer: {
            position: 'relative',
        },
        select: {
            padding: '10px',
            border: `1px solid ${theme.bookForm.inputBorderColor}`,
            borderRadius: '5px',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
            appearance: 'none',
        },
        button: {
            marginTop: 10,
            padding: '10px',
            backgroundColor: `${theme.bookForm.submitBackground}`,
            color: `${theme.bookForm.submitText}`,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
            ':hover': {
                backgroundColor: `${theme.bookForm.submitBackgroundHover}`,
            }
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const bookData = {
            title,
            isbn,
            price: parseFloat(price),
            authors: selectedAuthors
        };

        onSubmit(bookData);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = e.target.value;
        if (!newPrice || parseFloat(newPrice) >= 0) {
            setPrice(newPrice);
        }
    };

    const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIsbn = e.target.value;
        if (!newIsbn || /^\d{0,13}$/.test(newIsbn)) {
            setIsbn(newIsbn);
        }
    };

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedAuthors(selectedOptions);
    };

    return (
        <form onSubmit={handleSubmit} className={css(styles.form)}>
            <label htmlFor="title" className={css(styles.label)}>{bookTitle}</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={css(styles.input)}
                required
                aria-label={bookTitle}
            />
            <label htmlFor="isbn" className={css(styles.label)}>{isbnTranslation}:</label>
            <input
                id="isbn"
                type="text"
                value={isbn}
                onChange={handleIsbnChange}
                className={css(styles.input)}
                required
                maxLength={13}
                pattern="\d{13}"
                title={translations.getMessage("isbnTitle")}
                aria-label={isbnTranslation}
            />
            <label htmlFor="price" className={css(styles.label)}>{bookPrice}:</label>
            <input
                id="price"
                type="number"
                value={price}
                onChange={handlePriceChange}
                className={css(styles.input)}
                required
                aria-label={bookPrice}
            />
            <label htmlFor="authors" className={css(styles.label)}>{authorsTranslation}:</label>
            <div className={css(styles.selectContainer)}>
                <select
                    id="authors"
                    multiple
                    value={selectedAuthors}
                    onChange={handleAuthorChange}
                    className={css(styles.select)}
                    aria-label={authorsTranslation}
                >
                    {Object.values(authors).map(author => (
                        <option key={author._id} value={author._id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className={css(styles.button)}>{translations.getMessage("submit")}</button>
        </form>
    );
};

export default BookForm;
