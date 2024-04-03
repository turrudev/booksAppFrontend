import CRUD from "../Crud";
import AppRestService from "../restService/AppRestService";
import Book from "../../models/Book";

let instance: CRUD<Book> | null = null;

export const CrudFactory = <T extends Book>(type: string): CRUD<T> => {
    switch (type) {
        case  AppRestService.getName():
            if (!instance) instance = new AppRestService() as unknown as CRUD<T>;

            return instance as CRUD<T>;
        default:
            throw new Error(`Unknown CRUD service type: ${type}`);
    }
};

export const getCrudInstance = <T extends Book>(): CRUD<T> => {
    if (!instance) {
        throw new Error("No CRUD instance created yet.");
    }

    return instance as CRUD<T>;
};
