import React from 'react';
import Grid from "../../utils/Grid";
import {css, StyleSheet} from "aphrodite";
import BooksTable from "../../components/booksTable/BooksTable";

const Books = () => {
    const styles = StyleSheet.create({
        container: {
            ...Grid.define("max-content", "auto max-content")
        }
    });

    return (
        <div className={css(styles.container)}>
            <BooksTable/>
        </div>
    );
};

export default Books;

