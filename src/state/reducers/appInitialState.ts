import {BooksCollection} from "../../models/Book";
import {AuthorsCollection} from "../../models/Author";
import {RequestErrorCollection} from "../../models/RequestError";

export type AppStateType = {
    books: BooksCollection;
    authors: AuthorsCollection;
    ttl: number;
    errors: RequestErrorCollection;
};

const appInitialState: AppStateType = {
    books: {},
    authors: {},
    ttl: 0,
    errors: {}
};

export default appInitialState;