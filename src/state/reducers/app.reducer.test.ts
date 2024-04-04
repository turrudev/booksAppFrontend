import AppActions from '../actions/app.actions';
import AppReducer, {AppActionType} from "./app.reducer";
import appInitialState, {AppStateType} from "./appInitialState";
import RequestError from "../../models/RequestError";

describe('AppReducer', () => {
    const initialState: AppStateType = {
        ...appInitialState,
        books: {
            '1': {_id: '1', title: 'Initial Book 1', authors: ['author1'], price: 10},
            '2': {_id: '2', title: 'Initial Book 2', authors: ['author2'], price: 20}
        }
    };

    describe('SET_BOOKS action', () => {
        const testCases = [
            {
                name: 'should set books with authors and an empty initial state',
                action: {
                    type: AppActions.SET_BOOKS,
                    books: {
                        '1': {_id: '1', title: 'Book 1', authors: ['author1', 'author2'], price: 10},
                        '2': {_id: '2', title: 'Book 2', authors: ['author1'], price: 20}
                    },
                    ttl: 100
                },
                expectedState: {
                    ...initialState,
                    books: {
                        '1': {_id: '1', title: 'Book 1', authors: ['author1', 'author2'], price: 10},
                        '2': {_id: '2', title: 'Book 2', authors: ['author1'], price: 20}
                    },
                    ttl: 100
                }
            },
            {
                name: 'should overwrite existing books with new ones',
                action: {
                    type: AppActions.SET_BOOKS,
                    books: {
                        '1': {_id: '1', title: '1 overwrite', authors: ['author1', 'author3'], price: 25},
                        '2': {_id: '2', title: '2 overwrite', authors: ['authorOverwritten'], price: 15}
                    },
                    ttl: 200
                },
                expectedState: {
                    ...initialState,
                    books: {
                        '1': {_id: '1', title: '1 overwrite', authors: ['author1', 'author3'], price: 25},
                        '2': {_id: '2', title: '2 overwrite', authors: ['authorOverwritten'], price: 15}
                    },
                    ttl: 200
                }
            },
            {
                name: 'should update TTL value when setting books',
                action: {
                    type: AppActions.SET_BOOKS,
                    books: {
                        '4': {_id: '4', title: 'Book 4', authors: ['author1'], price: 30}
                    },
                    ttl: 300
                },
                expectedState: {
                    ...initialState,
                    books: {
                        '1': {_id: '1', title: 'Initial Book 1', authors: ['author1'], price: 10},
                        '2': {_id: '2', title: 'Initial Book 2', authors: ['author2'], price: 20},
                        '4': {_id: '4', title: 'Book 4', authors: ['author1'], price: 30}
                    },
                    ttl: 300
                }
            }
        ];

        testCases.forEach(({name, action, expectedState}) => {
            it(name, () => {
                expect(AppReducer(initialState, action as AppActionType)).toEqual(expectedState);
            });
        });
    });

    describe('SET_AUTHORS action', () => {
        const testCases = [
            {
                name: 'should set authors with an empty initial state',
                action: {
                    type: AppActions.SET_AUTHORS,
                    authors: {
                        'author3': {_id: 'author3', name: 'Author 3'},
                        'author4': {_id: 'author4', name: 'Author 4'}
                    },
                    ttl: 100
                },
                expectedState: {
                    ...initialState,
                    authors: {
                        'author3': {_id: 'author3', name: 'Author 3'},
                        'author4': {_id: 'author4', name: 'Author 4'}
                    },
                    ttl: 100
                }
            },
            {
                name: 'should overwrite existing authors with new ones',
                action: {
                    type: AppActions.SET_AUTHORS,
                    authors: {
                        'author1': {_id: 'author1', name: 'Author 1 Overwritten'},
                        'author2': {_id: 'author2', name: 'Author 2 Overwritten'}
                    },
                    ttl: 200
                },
                expectedState: {
                    ...initialState,
                    authors: {
                        'author1': {_id: 'author1', name: 'Author 1 Overwritten'},
                        'author2': {_id: 'author2', name: 'Author 2 Overwritten'}
                    },
                    ttl: 200
                }
            },
            {
                name: 'should update TTL value when setting authors',
                action: {
                    type: AppActions.SET_AUTHORS,
                    authors: {
                        'author5': {_id: 'author5', name: 'Author 5'}
                    },
                    ttl: 300
                },
                expectedState: {
                    ...initialState,
                    authors: {
                        'author5': {_id: 'author5', name: 'Author 5'}
                    },
                    ttl: 300
                }
            }
        ];

        testCases.forEach(({name, action, expectedState}) => {
            it(name, () => {
                expect(AppReducer(initialState, action as AppActionType)).toEqual(expectedState);
            });
        });
    });

    describe('DELETE_BOOK action', () => {
        const testCases = [
            {
                name: 'should delete a book from the state',
                action: {
                    type: AppActions.DELETE_BOOK,
                    bookId: '1'
                },
                expectedState: {
                    ...initialState,
                    books: {
                        '2': {_id: '2', title: 'Initial Book 2', authors: ['author2'], price: 20}
                    }
                }
            },
            {
                name: 'should not modify state if book ID does not exist',
                action: {
                    type: AppActions.DELETE_BOOK,
                    bookId: '3'
                },
                expectedState: {
                    ...initialState
                }
            }
        ];

        testCases.forEach(({name, action, expectedState}) => {
            it(name, () => {
                expect(AppReducer(initialState, action as AppActionType)).toEqual(expectedState);
            });
        });
    });

    describe('CREATE_BOOK and UPDATE_BOOK actions', () => {
        const testCases = [
            {
                name: 'should create a new book in the state',
                action: {
                    type: AppActions.CREATE_BOOK,
                    book: {_id: '3', title: 'New Book', authors: ['author3'], price: 30} // New book data
                },
                expectedState: {
                    ...initialState,
                    books: {
                        ...initialState.books,
                        '3': {_id: '3', title: 'New Book', authors: ['author3'], price: 30}
                    }
                }
            },
            {
                name: 'should update an existing book in the state',
                action: {
                    type: AppActions.UPDATE_BOOK,
                    book: {_id: '2', title: 'Updated Book', authors: ['author2', 'author3'], price: 25} // Updated book data
                },
                expectedState: {
                    ...initialState,
                    books: {
                        ...initialState.books,
                        '2': {_id: '2', title: 'Updated Book', authors: ['author2', 'author3'], price: 25}
                    }
                }
            }
        ];

        testCases.forEach(({name, action, expectedState}) => {
            it(name, () => {
                expect(AppReducer(initialState, action as AppActionType)).toEqual(expectedState);
            });
        });
    });

    describe('ADD_ERROR action', () => {
        const testCases = [
            {
                name: 'should add a new error to the state',
                action: {
                    type: AppActions.ADD_ERROR,
                    requestId: 'request3',
                    error: {code: 403, message: 'Forbidden'} as RequestError
                },
                expectedState: {
                    ...initialState,
                    errors: {
                        ...initialState.errors,
                        'request3': {code: 403, message: 'Forbidden'}
                    }
                }
            },
            {
                name: 'should overwrite an existing error in the state',
                action: {
                    type: AppActions.ADD_ERROR,
                    requestId: 'request2',
                    error: {code: 401, message: 'Unauthorized'} as RequestError
                },
                expectedState: {
                    ...initialState,
                    errors: {
                        ...initialState.errors,
                        'request2': {code: 401, message: 'Unauthorized'}
                    }
                }
            }
        ];

        testCases.forEach(({name, action, expectedState}) => {
            it(name, () => {
                expect(AppReducer(initialState, action as AppActionType)).toEqual(expectedState);
            });
        });
    });
});
