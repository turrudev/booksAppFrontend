import {call, select, takeEvery} from 'redux-saga/effects';
import Storage from "../../utils/Storage";

function* updateStateLocalStorage() {
    yield call(Storage.saveState, yield select());
}

export function* appSaga() {
    yield takeEvery('*', updateStateLocalStorage);
}