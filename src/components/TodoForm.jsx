import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

function TodoForm({ todos, setTodosLocal }) {
	const [title, setTitle] = useState("");

	const handleCreateTodo = (e) => {
		e.preventDefault();
		if (title == "" || !title.split(" ")[0]) {
			return;
		}
		const newTodos = [...todos];
		newTodos.push({ id: Date.now(), title, completed: false });
		setTitle("");
		setTodosLocal(newTodos);
	};

	return (
		<Form onSubmit={handleCreateTodo} className='mt-3' data-bs-theme={"dark"}>
			<Row className='mb-2'>
				<Col className='d-flex justify-content-center '>
					<div
						id='div-form-floating'
						className='form-floating w-100'
						data-bs-theme='dark'
					>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder='Enter title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
						<label htmlFor='floatingInput'>😺 😸 😹 😻 😼 😽 🙀 😿 😾</label>
					</div>
					<div className='m-1'>
						<Button variant='none' className='w-100' onClick={handleCreateTodo}>
							<img style={{ height: 40, width: 40 }} src='/add.svg' alt='add' />
						</Button>
					</div>
				</Col>
			</Row>
		</Form>
	);
}

export default TodoForm;
