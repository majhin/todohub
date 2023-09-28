import { useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

function CompletedTodoList({ completedTodos, setCompletedTodos }) {
	const handleDeleteCompletedTodo = (todoID) => {
		const todoIndex = completedTodos.findIndex((todo) => todo.id === todoID);
		if (todoIndex !== -1) {
			const newTodos = [...completedTodos];
			newTodos.splice(todoIndex, 1);
			setCompletedTodos(newTodos);
			localStorage.setItem("completedTodohub", JSON.stringify(newTodos));
		}
	};

	useEffect(() => {}, [completedTodos]);
	return (
		<ListGroup className='scrollable-feed mt-2' data-bs-theme={"dark"}>
			<h2 className='text-center text-white-50 '>
				{completedTodos.length > 1
					? `${completedTodos.length} Missions done`
					: completedTodos.length === 1
					? "1 Mission done"
					: ""}
			</h2>
			{completedTodos.map((todo) => (
				<Card key={todo.id} id={todo.id} className='m-2 w-100 '>
					<Card.Body className='d-flex justify-content-between align-items-center fade-enter'>
						<div>
							<Card.Title className='text-decoration-line-through '>
								{todo.title}
							</Card.Title>
						</div>
						<div>
							<div className='m-1'>
								<Button
									variant='none'
									className='w-100'
									onClick={() => handleDeleteCompletedTodo(todo.id)}
								>
									<img src='/delete.svg' alt='delete' />
								</Button>
							</div>
							<div className='m-1'>
								<Button variant='none' className='w-100'>
									<img src='/complete.svg' alt='complete' />
								</Button>
							</div>
						</div>
					</Card.Body>
				</Card>
			))}
		</ListGroup>
	);
}

export default CompletedTodoList;
