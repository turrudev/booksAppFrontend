import AppInitialState, {AppStateType} from "./appInitialState";
import AppActions from "../actions/app.actions";
import {BooksCollection} from "../../models/Book";
import Storage from "../../utils/Storage";
import {AuthorsCollection} from "../../models/Author";

export interface AppActionType {
    type: typeof AppActions[keyof typeof AppActions];
    books?: BooksCollection;
    authors?: AuthorsCollection;
    ttl?: number;
}

const AppReducer = (state: AppStateType = Storage.getState() || AppInitialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case AppActions.SET_BOOKS:
            return {
                ...state,
                books: {
                    ...state.books,
                    ...action.books
                },
                ttl: action.ttl!
            };
        case AppActions.SET_AUTHORS:
            return {
                ...state,
                authors: {
                    ...state.authors,
                    ...action.authors
                },
                ttl: action.ttl!
            };
        default:
            return state;
    }
};

export default AppReducer;