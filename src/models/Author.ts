type Author = {
    _id: string;
    name: string;
};

export type AuthorsCollection = Record<string, Author>;

export default Author;