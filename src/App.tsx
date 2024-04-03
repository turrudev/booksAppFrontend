import React from 'react';
import {ThemeProvider} from "./providers/ThemeProvider";
import {TranslationsProvider} from "./providers/TranslationProvider";
import {Provider} from "react-redux";
import store from "./state/store/store";
import Main from "./pages/Main";
import CRUD from "./services/Crud";
import Book from "./models/Book";
import {CrudFactory} from "./services/crudFactory/CrudFactory";
import AppRestService from "./services/restService/AppRestService";

interface AppProps {
    service?: CRUD<Book>;
}

const App = ({service}: AppProps) => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <TranslationsProvider>
                    <ThemeProvider>
                        <Main service={service || CrudFactory(AppRestService.getName())}/>
                    </ThemeProvider>
                </TranslationsProvider>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
