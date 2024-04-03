import React, {useContext} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import MediaQueryUtils from "../../utils/MediaQuery";
import {useSelector} from "react-redux";
import Loader from "../loader/Loader";
import Grid from "../../utils/Grid";
import {BooksCollection} from "../../models/Book";
import {AppStateType} from "../../state/reducers/appInitialState";
import {AuthorsCollection} from "../../models/Author";

export const BOOKS_TEST_ID = {
    Books: "book-row_"
};

const BooksTable = () => {
    const translations = useContext(TranslationsContext),
        books: BooksCollection = useSelector((state: AppStateType) => state.books),
        authors: AuthorsCollection = useSelector((state: AppStateType) => state.authors),
        {theme} = useContext(ThemeContext),
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
            }
        }),
        booksReady: boolean = books && Object.keys(books).length > 0,
        booksMessage: string = translations.getMessage("booksPage");


    const handleGoToBook = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableRowElement>, bookId: number): void => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableRowElement>).key === "Enter")) {
        }
    };

    return (
        <div className={css(styles.container)}>
            <h2 className={css(styles.title)}>{booksMessage}</h2>
            {booksReady && <table className={css(styles.table)} aria-label={booksMessage}>
                <thead>
                <tr>
                    <th className={css(styles.th)}>{translations.getMessage("bookTitle")}</th>
                    <th className={css(styles.th)}>{translations.getMessage("price")}</th>
                    <th className={css(styles.th)}>{translations.getMessage("authors")}</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(books).map((book, key) => {
                    const bookId: number = key;

                    return (
                        <tr key={bookId} className={css(styles.tr)} onClick={(event) => handleGoToBook(event, bookId)}
                            onKeyDown={(event) => handleGoToBook(event, bookId)}
                            tabIndex={0} role="button" aria-label={translations.getMessage("goToBook")} data-testid={`${BOOKS_TEST_ID.Books}${bookId}`}>
                            <td className={css(styles.td)}><b>{book.title}</b></td>
                            <td className={css(styles.td)}>{book.price} €</td>
                            <td className={css(styles.td)}>{book.authors.map(authorId => authors[authorId].name).join(", ")}</td>
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