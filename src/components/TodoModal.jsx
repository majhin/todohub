import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function TodoModal({
	handleCloseTodoModal,
	todoModalShow,
	todoToBeUpdated,
	todos,
	setTodosLocal,
}) {
	const [title, setTitle] = useState("");

	const handleUpdateTodo = () => {
		if (title == "") {
			return;
		}

		const todoIndex = todos.findIndex((todo) => todo.id === todoToBeUpdated);

		if (todoIndex !== -1) {
			// Update the todo in state
			const newTodos = [...todos];
			newTodos[todoIndex] = { id: todoToBeUpdated, title, completed: false };
			setTodosLocal(newTodos);
		}

		handleCloseTodoModal();
		setTitle("");
	};

	useEffect(() => {
		if (todoToBeUpdated) {
			const updatedTodo = todos.find((todo) => todo.id === todoToBeUpdated);
			if (updatedTodo) {
				setTitle(updatedTodo.title);
			}
		}
	}, [todoToBeUpdated]);

	return (
		<Modal
			show={todoModalShow}
			onHide={handleCloseTodoModal}
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title className='text-center '>Update Todo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleUpdateTodo} className='w-100'>
					<Row className='mb-2'>
						<Col className='row p-2'>
							<div className='form-floating'>
								<input
									type='text'
									className='form-control'
									id='floatingInput'
									placeholder='Enter title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
								<label style={{ marginLeft: 5 }} htmlFor='floatingInput'>
									👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃
								</label>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='warning' onClick={handleUpdateTodo}>
					Update Todo
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TodoModal;
