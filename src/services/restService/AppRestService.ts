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


    async create(item: Partial<Book>): Promise<Book> {
        try {
            const response = await fetch(`${BackendAddress}${Endpoints.Books}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) throw new Error('Failed to create book');

            return await response.json();
        } catch (error) {
            Logger.logError('Error creating book:', error);
            throw error;
        }
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

    async update(id: string, item: Partial<Book>): Promise<Book | undefined> {
        try {
            const response = await fetch(`${BackendAddress}${Endpoints.Books}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) throw new Error('Failed to update book');

            return await response.json();
        } catch (error) {
            Logger.logError('Error updating book:', error);
            throw error;
        }
    }
}

export {Endpoints};