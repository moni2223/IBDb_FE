import { configureStore } from "@reduxjs/toolkit";

import general from "./general";
import library from "./library";
import users from "./users";

export * from "./general";
export * from "./library";
export * from "./users";

const store = configureStore({
  reducer: {
    general,
    library,
    users,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
