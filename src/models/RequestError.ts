type RequestError = string[];

export type RequestErrorCollection = Record<string, RequestError>;

const errorToRequestError = (e: Error | string): RequestError => {
    return [e instanceof Error ? e.message : String(e)];
};

export {errorToRequestError};

export default RequestError;