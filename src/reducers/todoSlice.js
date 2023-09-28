import { createSlice, current } from "@reduxjs/toolkit";

const getInitialTodos = () => {
	if (localStorage.getItem("todohub")) {
		const todos = JSON.parse(localStorage.getItem("todohub"));
		return todos;
	} else {
		localStorage.setItem("todohub", JSON.stringify([]));
		return [];
	}
};

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		data: getInitialTodos(),
	},
	reducers: {
		addTodo: (state, action) => {
			state.data.push(action.payload);
			localStorage.setItem("todohub", JSON.stringify(state.data));
		},
		deleteTodo: (state, action) => {
			const todoIndex = state.data.findIndex(
				(todo) => todo.id === action.payload
			);
			if (todoIndex !== -1) {
				state.data.splice(todoIndex, 1);
				localStorage.setItem("todohub", JSON.stringify(state.data));
			}
		},
		updateTodo: (state, action) => {
			const { id, title, completed } = action.payload;
			const todoIndex = state.data.findIndex((todo) => todo.id === id);

			if (todoIndex !== -1) {
				// Update the todo in state
				state.data[todoIndex] = { id, title, completed };
				localStorage.setItem("todohub", JSON.stringify(state.data)); // Update localStorage
			}
		},
		reorderTodo: (state, action) => {
			const newState = JSON.parse(localStorage.getItem("todohub"));
			return newState;
		},
	},
});

export const { addTodo, deleteTodo, updateTodo, reorderTodo } =
	todoSlice.actions;
export default todoSlice.reducer;
