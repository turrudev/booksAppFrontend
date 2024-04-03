import {call, select, takeEvery, put} from 'redux-saga/effects';
import Storage from "../../utils/Storage";
import AppActions from "../actions/app.actions";
import {AppActionType} from "../reducers/app.reducer";
import {getCrudInstance} from "../../services/crudFactory/CrudFactory";
import Logger from "../../utils/Logger";
import appCreator from "../creators/app.creator";

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

export function* appSaga() {
    yield takeEvery('*', updateStateLocalStorage);
    yield takeEvery(AppActions.DELETE_BOOK_REQUEST, deleteBook);
}