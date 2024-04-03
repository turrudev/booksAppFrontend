import {BooksCollection} from "../../models/Book";
import {AuthorsCollection} from "../../models/Author";

export type AppStateType = {
    books: BooksCollection;
    authors: AuthorsCollection;
    ttl: number;
};

const appInitialState: AppStateType = {
    books: {},
    authors: {},
    ttl: 0
};

export default appInitialState;