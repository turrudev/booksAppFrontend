import React, {useContext} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {useNavigate} from 'react-router-dom';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import MediaQueryUtils from "../../utils/MediaQuery";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader/Loader";
import Grid from "../../utils/Grid";
import {BooksCollection} from "../../models/Book";
import {AppStateType} from "../../state/reducers/appInitialState";
import {AuthorsCollection} from "../../models/Author";
import {RouterPaths} from "../../pages/Main";
import AppCreator from "../../state/creators/app.creator";

export const BOOKS_TEST_ID = {
    Books: "book-row_"
};

const BooksTable = () => {
    const translations = useContext(TranslationsContext),
        books: BooksCollection = useSelector((state: AppStateType) => state.books),
        authors: AuthorsCollection = useSelector((state: AppStateType) => state.authors),
        {theme} = useContext(ThemeContext),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        styles = StyleSheet.create({
            container: {
                ...Grid.setRowCol(1, 1),
                overflowX: "auto",
                maxHeight: "100vh",
                overflowY: "scroll",
                ...MediaQueryUtils.mobile({maxWidth: 300})
            },
            table: {
                color: theme.table.text,
                fontSize: 14,
                borderCollapse: 'collapse',
                width: '100%',
                ...MediaQueryUtils.mobile({fontSize: 12})
            },
            th: {
                color: theme.table.thText,
                fontWeight: 400,
                borderBottom: 0,
                borderTop: `1px solid ${theme.table.thBorder}`,
                textAlign: 'left',
                padding: "9px 0 9px 24px",
                ...MediaQueryUtils.mobile({padding: "6px 0 6px 12px"})
            },
            td: {
                borderTop: `0.25px solid ${theme.table.tdBorder}`,
                borderBottom: `0.25px solid ${theme.table.tdBorder}`,
                padding: "19px 0 19px 24px",
                ...MediaQueryUtils.mobile({padding: "8px 0 19px 12px"})
            },
            title: {
                fontSize: 18,
                fontWeight: 400,
                margin: 0,
                padding: 13,
                ...MediaQueryUtils.mobile({padding: 6})
            },
            tr: {
                cursor: "pointer"
            },
            actionButton: {
                padding: '8px 16px',
                margin: '0 4px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                ':hover': {
                    opacity: 0.9,
                },
            },
            removeButton: {
                backgroundColor: theme.table.removeButtonBackground,
                color: theme.table.removeButtonText
            }
        }),
        booksReady: boolean = books && Object.keys(books).length > 0,
        booksMessage: string = translations.getMessage("booksPage"),
        removeMessage: string = translations.getMessage("remove"),
        editMessage: string = translations.getMessage("edit");

    const handleGoToBook = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableRowElement>, bookId: number): void => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableRowElement>).key === "Enter")) {
            navigate(RouterPaths.Book.replace(":id", `${bookId}`));
        }
    };

    const handleRemoveBook = (event: React.MouseEvent<HTMLButtonElement>, bookId: number): void => {
        event.stopPropagation();
        dispatch(AppCreator.deleteBookRequest(bookId));
    };

    return (
        <div className={css(styles.container)}>
            <h2 className={css(styles.title)}>{booksMessage}</h2>
            {booksReady && <table className={css(styles.table)} aria-label={booksMessage}>
                <thead>
                <tr>
                    <th className={css(styles.th)}>{translations.getMessage("bookTitle")}</th>
                    <th className={css(styles.th)}>{translations.getMessage("price")}</th>
                    <th className={css(styles.th)}>{translations.getMessage("price")}</th>
                    <th className={css(styles.th)}>{translations.getMessage("actions")}</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(books).map((book, key) => {
                    const bookId: number = parseInt(book._id);

                    return (
                        <tr key={bookId} className={css(styles.tr)} onClick={(event) => handleGoToBook(event, bookId)}
                            onKeyDown={(event) => handleGoToBook(event, bookId)}
                            tabIndex={0} role="button" aria-label={translations.getMessage("goToBook")} data-testid={`${BOOKS_TEST_ID.Books}${bookId}`}>
                            <td className={css(styles.td)}><b>{book.title}</b></td>
                            <td className={css(styles.td)}>{book.price} €</td>
                            <td className={css(styles.td)}>{book.authors.map(authorId => authors[authorId].name).join(", ")}</td>
                            <td className={css(styles.td)}>
                                <button
                                    className={css(styles.actionButton)}
                                    onClick={(event) => handleGoToBook(event, bookId)}
                                    aria-label={editMessage}
                                    aria-labelledby={`remove-${bookId}`}
                                >
                                    {editMessage}
                                </button>
                                <button
                                    className={css(styles.actionButton, styles.removeButton)}
                                    onClick={(event) => handleRemoveBook(event, bookId)}
                                    aria-label={removeMessage}
                                    aria-labelledby={`edit-${bookId}`}
                                >
                                    {removeMessage}
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>}
            {!booksReady && <Loader/>}
        </div>
    );
};

export default BooksTable;
