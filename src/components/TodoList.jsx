import { useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoList({
	handleOpenTodoModal,
	todos,
	setTodosLocal,
	completedTodos,
	setCompletedTodos,
}) {
	const handleDeleteTodo = (todoID) => {
		const todoIndex = todos.findIndex((todo) => todo.id === todoID);
		if (todoIndex !== -1) {
			const newTodos = [...todos];
			newTodos.splice(todoIndex, 1);
			setTodosLocal(newTodos);
		}
	};

	const handleMarkTodoCompleted = (todoID) => {
		const newTodos = [...todos];
		const todoIndex = todos.findIndex((todo) => todo.id === todoID);
		if (todoIndex !== -1) {
			newTodos[todoIndex].completed = true;
			const newCompletedTodo = newTodos[todoIndex];
			handleDeleteTodo(todoID);
			const newCompletedTodos = [...completedTodos];
			newCompletedTodos.unshift(newCompletedTodo);

			setCompletedTodos(newCompletedTodos);
			localStorage.setItem(
				"completedTodohub",
				JSON.stringify(newCompletedTodos)
			);
		}
	};

	const handleReorder = (param) => {
		if (param.destination != null) {
			const srcI = param.source.index;
			const desI = param.destination.index;
			const newTodos = [...todos];
			newTodos.splice(desI, 0, newTodos.splice(srcI, 1)[0]);
			setTodosLocal(newTodos);
		}
	};

	useEffect(() => {}, [todos]);
	return (
		<DragDropContext onDragEnd={(param) => handleReorder(param)}>
			<ListGroup className='scrollable-feed' data-bs-theme={"dark"}>
				<h1 className='text-center text-white-50 '>
					{todos && todos.length === 0
						? "No Mission Left 😎"
						: `${todos && todos.length} Pending...`}
				</h1>
				<Droppable droppableId='todo-list'>
					{(provided, _) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{todos &&
								todos.map((todo, i) => (
									<Draggable
										key={todo.id}
										draggableId={"draggable-" + todo.id}
										index={i}
									>
										{(provided, snapshot) => (
											<Card
												key={todo.id}
												className='m-2 w-100'
												ref={provided.innerRef}
												{...provided.draggableProps}
												style={{
													...provided.draggableProps.style,
													boxShadow: snapshot.isDragging
														? "0 0 .4rem #777"
														: "none",
												}}
												{...provided.dragHandleProps}
											>
												<Card.Body className='d-flex justify-content-between align-items-center'>
													<div>
														<Card.Title>{todo.title}</Card.Title>
													</div>
												</Card.Body>
												<Card.Footer>
													<div className='d-flex justify-content-end'>
														<div className='m-1'>
															<Button
																variant='none'
																onClick={() => handleMarkTodoCompleted(todo.id)}
															>
																<img src='/incomplete.svg' alt='incomplete' />
															</Button>
														</div>
														<div className='m-1'>
															<Button
																variant='none'
																onClick={() => handleDeleteTodo(todo.id)}
															>
																<img src='/delete.svg' alt='delete' />
															</Button>
														</div>
														<div className='m-1'>
															<Button
																variant='none'
																onClick={() => handleOpenTodoModal(todo.id)}
															>
																<img src='/update.svg' alt='update' />
															</Button>
														</div>
													</div>
												</Card.Footer>
											</Card>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</ListGroup>
		</DragDropContext>
	);
}

export default TodoList;
