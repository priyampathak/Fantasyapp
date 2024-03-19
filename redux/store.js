import { configureStore } from "@reduxjs/toolkit";
import datareducer from './reducers'

const store = configureStore({
    reducer: {
        data: datareducer
    },
});

export default store