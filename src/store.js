import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./reducers/todoSlice";
import completedTodosSlice from "./reducers/completedTodosSlice";

export const store = configureStore({
	reducer: {
		todos: todoSlice,
		completedTodos: completedTodosSlice,
	},
});
