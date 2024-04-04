import {call, put, select, takeEvery} from 'redux-saga/effects';
import Storage from "../../utils/Storage";
import AppActions from "../actions/app.actions";
import {AppActionType} from "../reducers/app.reducer";
import {getCrudInstance} from "../../services/crudFactory/CrudFactory";
import appCreator from "../creators/app.creator";
import Logger from "../../utils/Logger";
import Book from "../../models/Book";
import {errorToRequestError} from "../../models/RequestError";

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
    } catch (e: any) {
        yield put(appCreator.addError(errorToRequestError(e), action.requestId!));
    }
}

function* updateBook(action: AppActionType): Generator<any, void, Book> {
    try {
        const {_id, ...bookDataWithoutId} = action.book!;
        const book: Book = yield call(getCrudInstance().update, _id!, bookDataWithoutId);
        if (book) yield put(appCreator.updateBook(book));
    } catch (e: any) {
        yield put(appCreator.addError(errorToRequestError(e), action.requestId!));
    }
}

export function* appSaga() {
    yield takeEvery('*', updateStateLocalStorage);
    yield takeEvery(AppActions.DELETE_BOOK_REQUEST, deleteBook);
    yield takeEvery(AppActions.CREATE_BOOK_REQUEST, createBook);
    yield takeEvery(AppActions.UPDATE_BOOK_REQUEST, updateBook);
}