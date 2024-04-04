import React, {useContext, useEffect, useState} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../state/reducers/appInitialState';
import Book, {getEmptyBook} from '../../models/Book';
import {AuthorsCollection} from '../../models/Author';
import {TranslationsContext} from '../../providers/TranslationProvider';
import {ThemeContext} from '../../providers/ThemeProvider';
import {RequestErrorCollection} from "../../models/RequestError";

interface BookFormProps {
    onSubmit: Function;
    book: Book;
    createForm: boolean;
    requestId: string;
}

const BookForm = ({onSubmit, book, createForm, requestId}: BookFormProps) => {
    const translations = useContext(TranslationsContext),
        authors: AuthorsCollection = useSelector((state: AppStateType) => state.authors),
        errors: RequestErrorCollection = useSelector((state: AppStateType) => state.errors),
        {theme} = useContext(ThemeContext),
        [bookFormData, setBookFormData] = useState({
            title: book.title,
            _id: book._id,
            price: book.price,
            authors: book.authors
        }),
        styles = StyleSheet.create({
            form: {
                maxWidth: 400,
                margin: '10px auto',
                display: 'flex',
                flexDirection: 'column'
            },
            label: {
                marginBottom: 5,
                fontSize: 16
            },
            input: {
                border: `1px solid ${theme.bookForm.inputBorderColor}`,
                padding: 10,
                marginBottom: 20,
                fontSize: 16,
                borderRadius: 5,
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '100%'
            },
            button: {
                marginTop: 10,
                padding: 10,
                backgroundColor: `${theme.bookForm.submitBackground}`,
                color: `${theme.bookForm.submitText}`,
                fontSize: 16,
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                ':hover': {
                    backgroundColor: `${theme.bookForm.submitBackgroundHover}`,
                },
            },
            errors: {
                backgroundColor: theme.errors.backgroundColor,
                color: theme.errors.text,
                maxWidth: 400,
                marginTop: 10,
                padding: 10,
                borderRadius: 5,
                margin: "0 auto"
            }
        });

    useEffect(() => {
        if (createForm) setBookFormData(getEmptyBook());
    }, [requestId, createForm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        let selectedValues: string[] = [];

        if (e.target instanceof HTMLSelectElement) {
            const selectElement = e.target as HTMLSelectElement;

            selectedValues = Array.from(selectElement.selectedOptions).map(
                (option) => option.value
            );
        }

        setBookFormData({
            ...bookFormData,
            [name]: selectedValues.length ? selectedValues : value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(bookFormData);
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className={css(styles.form)}>
                <label htmlFor="title" className={css(styles.label)}>
                    {translations.getMessage('bookTitle')}
                </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={bookFormData.title}
                    onChange={handleChange}
                    className={css(styles.input)}
                    required
                    aria-label={translations.getMessage('bookTitle')}
                />
                {createForm && (
                    <>
                        <label htmlFor="isbn" className={css(styles.label)}>
                            {translations.getMessage('isbn')}:
                        </label>
                        <input
                            id="isbn"
                            type="text"
                            name="_id"
                            value={bookFormData._id}
                            onChange={handleChange}
                            className={css(styles.input)}
                            required
                            maxLength={13}
                            pattern="\d{13}"
                            title={translations.getMessage('isbnTitle')}
                            aria-label={translations.getMessage('isbn')}
                        />
                    </>
                )}
                <label htmlFor="price" className={css(styles.label)}>
                    {translations.getMessage('price')}
                </label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    value={bookFormData.price}
                    onChange={handleChange}
                    className={css(styles.input)}
                    required
                    aria-label={translations.getMessage('price')}
                />
                <label htmlFor="authors" className={css(styles.label)}>
                    {translations.getMessage('authors')}
                </label>
                <select
                    id="authors"
                    name="authors"
                    multiple
                    value={bookFormData.authors}
                    onChange={handleChange}
                    className={css(styles.input)}
                    aria-label={translations.getMessage('authors')}
                    required
                >
                    {Object.values(authors).map((author) => (
                        <option key={author._id} value={author._id}>
                            {author.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className={css(styles.button)}>
                    {translations.getMessage('submit')}
                </button>
            </form>
            {errors[requestId] &&
                <div className={css(styles.errors)}>
                    {errors[requestId].map((error, index) => (
                        <React.Fragment key={index}>
                            {error}
                            <br/>
                        </React.Fragment>
                    ))}
                </div>
            }
        </React.Fragment>
    );
};

export default BookForm;
