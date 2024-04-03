import {call, put, select, takeEvery} from 'redux-saga/effects';
import Storage from "../../utils/Storage";
import AppActions from "../actions/app.actions";
import {AppActionType} from "../reducers/app.reducer";
import {getCrudInstance} from "../../services/crudFactory/CrudFactory";
import appCreator from "../creators/app.creator";
import Logger from "../../utils/Logger";
import Book from "../../models/Book";

function* updateStateLocalStorage() {
    yield call(Storage.saveState, yield select());
}

function* deleteBook(action: AppActionType): Generator<any, void, boolean> {
    try {
        const result = yield call(getCrudInstance().delete, `${action.bookId}`);
        if (result) yield put(appCreator.deleteBook(action.bookId!));
    } catch (e) {
        Logger.logError(e);
    }
}

function* createBook(action: AppActionType): Generator<any, void, Book> {
    try {
        const book: Book = yield call(getCrudInstance().create, action.book!);
        if (book) yield put(appCreator.createBook(book));
    } catch (e) {
        Logger.logError(e);
    }
}

export function* appSaga() {
    yield takeEvery('*', updateStateLocalStorage);
    yield takeEvery(AppActions.DELETE_BOOK_REQUEST, deleteBook);
    yield takeEvery(AppActions.CREATE_BOOK_REQUEST, createBook);
}