export type AuthorId = string;

type Book = {
    _id: string;
    title: string;
    authors: AuthorId[];
    price: number;
};

export type BooksCollection = Record<string, Book>;

const getEmptyBook = (): Book => {
    return {
        _id: '',
        title: '',
        price: 1,
        authors: [],
    } as Book;
};

export default Book;

export {getEmptyBook};