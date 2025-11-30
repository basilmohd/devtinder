import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionsReducer from "./connections.js";
import requestReducer from "./requestSlice.js";

const appStore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        connections: connectionsReducer,
        requests: requestReducer
    }
});

export default appStore;




