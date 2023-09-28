import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";
import CompletedTodoList from "./CompletedTodosList";

function Home() {
	const [todoModalShow, setTodoModalShow] = useState(false);
	const [todoToBeUpdated, setTodoToBeUpdated] = useState("");
	const [todos, setTodos] = useState([]);
	const [completedTodos, setCompletedTodos] = useState([]);

	const setTodosLocal = (todos) => {
		localStorage.setItem("todohub", JSON.stringify(todos));
		setTodos(todos);
	};

	const handleOpenTodoModal = (todoID) => {
		setTodoToBeUpdated(todoID);
		setTodoModalShow(true);
	};

	const handleCloseTodoModal = () => {
		setTodoModalShow(false);
		setTodoToBeUpdated("");
	};

	const handleTodoReset = () => {
		setTodos([]);
		setCompletedTodos([]);
		if (localStorage.getItem("todohub")) {
			localStorage.removeItem("todohub");
		}
		if (localStorage.getItem("completedTodohub")) {
			localStorage.removeItem("completedTodohub");
		}
	};

	useEffect(() => {
		if (localStorage.getItem("todohub")) {
			setTodos(JSON.parse(localStorage.getItem("todohub")));
		} else {
			localStorage.setItem("todohub", JSON.stringify([]));
		}
		if (localStorage.getItem("completedTodohub")) {
			setCompletedTodos(JSON.parse(localStorage.getItem("completedTodohub")));
		} else {
			localStorage.setItem("completedTodohub", JSON.stringify([]));
		}
	}, []);
	return (
		<>
			<div className='position-fixed top-0 end-0'>
				<Button variant='none' onClick={() => handleTodoReset()}>
					<img src='/reset.svg' alt='reset' />
				</Button>
			</div>
			<Container className='mt-2'>
				<Row className='justify-content-center  '>
					<img
						src='/Todo.jpg'
						alt='Logo'
						style={{ height: 50, width: 170, borderRadius: 10 }}
					/>
				</Row>
				<Row className='justify-content-center  mt-2'>
					<Col>
						<TodoForm todos={todos} setTodosLocal={setTodosLocal} />
					</Col>
				</Row>
				<Row className='justify-content-center  '>
					<Col className='row'>
						<TodoList
							handleOpenTodoModal={handleOpenTodoModal}
							todos={todos}
							setTodosLocal={setTodosLocal}
							setCompletedTodos={setCompletedTodos}
							completedTodos={completedTodos}
						/>
					</Col>
				</Row>
				<Row className='justify-content-center  '>
					<Col className='row'>
						<CompletedTodoList
							completedTodos={completedTodos}
							setCompletedTodos={setCompletedTodos}
							setTodosLocal={setTodosLocal}
						/>
					</Col>
				</Row>

				<TodoModal
					handleCloseTodoModal={handleCloseTodoModal}
					todoModalShow={todoModalShow}
					todoToBeUpdated={todoToBeUpdated}
					todos={todos}
					setTodosLocal={setTodosLocal}
				/>
			</Container>
		</>
	);
}

export default Home;
