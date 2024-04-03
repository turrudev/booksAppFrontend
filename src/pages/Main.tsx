import React, {useContext, useEffect, useRef} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {css, StyleSheet} from "aphrodite";
import {ThemeContext} from "../providers/ThemeProvider";
import Grid from "../utils/Grid";
import Nav from "../components/nav/Nav";
import withDocumentTitle from "./withDocumentTitle";
import Books from "./books/Books";
import {TranslationsContext} from "../providers/TranslationProvider";
import CRUD from "../services/Crud";
import Book, {BooksCollection} from "../models/Book";
import {AppStateType} from "../state/reducers/appInitialState";
import {useDispatch, useSelector} from "react-redux";
import AppCreator from "../state/creators/app.creator";
import Time from "../utils/Time";
import {Endpoints} from "../services/restService/AppRestService";
import Logger from "../utils/Logger";
import Author, {AuthorsCollection} from "../models/Author";
import UpdateBook from "./updateBook/UpdateBook";
import CreateBook from "./createBook/CreateBook";

type PageLinks = {
    Books: string;
    Book: string;
    NewBook: string;
};

export const RouterPaths: PageLinks = {
    Books: "/books",
    Book: "/books/:id",
    NewBook: "/books/new"
};

interface MainProps {
    service: CRUD<Book>;
}

const Main = ({service}: MainProps) => {
    const {theme} = useContext(ThemeContext),
        styles = StyleSheet.create({
            mainWrapper: Grid.define("auto", "auto"),
            main: {
                ...Grid.setRowCol(1, 1),
                ...Grid.define("auto", "minmax(auto, 226px) auto"),
                backgroundColor: theme.app.background,
                minHeight: "100vh",
                height: "100%"
            },
            nav: Grid.setRowCol(1, 1),
            pageContent: Grid.setRowCol(1, 2)
        }),
        ttl: number = useSelector((state: AppStateType) => state.ttl),
        dispatch = useDispatch(),
        ttlTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const checkTTLAndFetch = async () => {
            if (Time.ttlInvalid(ttl)) {
                try {
                    const booksRecord = (await service.readAll(Endpoints.Books.All) as unknown as Book[]).reduce((acc: BooksCollection, book: Book) => {
                            acc[book._id] = book;
                            return acc;
                        }, {}),
                        authorsRecord = (await service.readAll(Endpoints.Authors.All) as unknown as Author[]).reduce((acc: AuthorsCollection, author: Author) => {
                            acc[author._id] = author;
                            return acc;
                        }, {});

                    const ttl: number = Time.getTimeInMs();

                    dispatch(AppCreator.setBooks(booksRecord, ttl));
                    dispatch(AppCreator.setAuthors(authorsRecord, ttl));
                } catch (error) {
                    Logger.logError('Error fetching books:', error);
                }
            }

            ttlTimerRef.current = setTimeout(checkTTLAndFetch, ttl - Time.getTimeInMs());
        };

        checkTTLAndFetch();

        return () => {
            if (ttlTimerRef.current) clearTimeout(ttlTimerRef.current!);
        };
    }, [dispatch, service, ttl]);

    const BooksPage = withDocumentTitle(Books, useContext(TranslationsContext).getMessage('booksPage')),
        UpdateBookPage = withDocumentTitle(UpdateBook, useContext(TranslationsContext).getMessage('bookForm')),
        NewBookPage = withDocumentTitle(CreateBook, useContext(TranslationsContext).getMessage('bookForm'));

    return (
        <div className={css(styles.mainWrapper)}>
            <div className={css(styles.main)}>
                <Router>
                    <Nav extraStyle={styles.nav}/>
                    <div className={css(styles.pageContent)}>
                        <Routes>
                            <Route path={RouterPaths.Books} element={<BooksPage/>}/>
                            <Route path={RouterPaths.Book} element={<UpdateBookPage onSubmit={() => void (0)}/>}/>
                            <Route path={RouterPaths.NewBook} element={<NewBookPage onSubmit={() => void (0)}/>}/>
                            <Route path="*" element={<Navigate to={RouterPaths.Books}/>}/>
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    );
};

export default Main;

