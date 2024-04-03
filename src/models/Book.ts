type AuthorId = string;

type Book = {
    _id: string;
    title: string;
    authors: AuthorId[];
    price: number;
};

export type BooksCollection = Record<string, Book>;

export default Book;