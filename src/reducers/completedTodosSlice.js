import { createSlice } from "@reduxjs/toolkit";

const getInitialCompletedTodos = () => {
	if (localStorage.getItem("completedTodohub")) {
		const todos = JSON.parse(localStorage.getItem("completedTodohub"));
		return todos;
	} else {
		localStorage.setItem("completedTodohub", JSON.stringify([]));
		return [];
	}
};

const completedTodosSlice = createSlice({
	name: "completedTodos",
	initialState: {
		data: getInitialCompletedTodos(),
	},
	reducers: {
		addCompletedTodo: (state, action) => {
			state.data.unshift(action.payload); // Add the completed todo to the beginning of the array (LIFO)
			localStorage.setItem("completedTodohub", JSON.stringify(state.data));
		},
		deleteCompletedTodo: (state, action) => {
			const todoIndex = state.data.findIndex(
				(todo) => todo.id === action.payload
			);
			if (todoIndex !== -1) {
				state.data.splice(todoIndex, 1);
				localStorage.setItem("completedTodohub", JSON.stringify(state.data));
			}
		},
	},
});

export const { addCompletedTodo, deleteCompletedTodo } =
	completedTodosSlice.actions;

export default completedTodosSlice.reducer;
