import CRUD from "../Crud";
import Book from "../../models/Book";
import Logger from "../../utils/Logger";
import Author from "../../models/Author";

const BackendAddress: string = "http://localhost:3000/",
    Endpoints = {
        Books: "books",
        Authors: "authors"
    };

export default class AppRestService implements CRUD<Book | Author> {
    async readAll(resource?: string): Promise<Book[] | Author[]> {
        try {
            const response = await fetch(`${BackendAddress}${resource}`);

            if (!response.ok) throw new Error('Failed to fetch books');

            return await response.json();
        } catch (error) {
            Logger.logError('Error fetching books:', error);
            return [];
        }
    }

    static getName(): string {
        return "rest";
    }

    create(item: Partial<Book>): Promise<Book> {
        return new Promise<Book>(resolve => {
            resolve({_id: "1", authors: [], price: 0, title: ""});
        });
    }

    delete(id: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const response = await fetch(`${BackendAddress}${Endpoints.Books}/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Failed to delete book');

                resolve(true);
            } catch (error) {
                Logger.logError('Error deleting book:', error);
                resolve(false);
            }
        });
    }

    update(id: string, item: Partial<Book>): Promise<Book | undefined> {
        return Promise.resolve(undefined);
    }
}

export {Endpoints};