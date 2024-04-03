export default interface CRUD<T> {
    create(item: Partial<T>): Promise<T>;

    readAll(resource?: string): Promise<T[]>;

    update(id: string, item: Partial<T>): Promise<T | undefined>;

    delete(id: string): Promise<boolean>;
}
