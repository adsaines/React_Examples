// boilerplate
import React from "react";
// my three components
import TodoList from "./TodoList";
import Completed from "./Completed";
import {v4 as uuid} from "uuid"

// boostrap items needed
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

// App Level Values
const LOCAL_STORAGE_KEY = `todoItems`
let local_todos_loaded = false

function App() {
	// useState is a hook that returns two values, one is the items you provide and 2 is an anonymous callback function that accepts a new array and will update the originally passed array to match the new one
	const [todoListItems,updateMainTodos] = React.useState([])
	const [completedTodos,updateCompleted] = React.useState([])
	const newTodoWordText = React.createRef()

	/**
	 * Update the existing todo list to display the newly added item
	 * @param {Object} eve 
	 */
	function addTodoItem(eve){
		const newText = newTodoWordText.current.value;

		if (newText === ''){
			console.log(`You gotta type something`);
		} else {
			// load value into todoListItems using the pre-defined update function
			// this is an example of object destructering syntax... https://www.youtube.com/watch?v=NIq3qLaHCIs
			// essentially: "...prevTodos" takes the prev array values and we add a new element to it
			updateMainTodos(prevTodos => {
				return [...prevTodos, {id:uuid(),text:newText,complete:false}]
			})
			// clear value
			newTodoWordText.current.value = null
		}
	}

	/**
	 * Flip the complete status for the id in question
	 * @param {Number} id 
	 */
	function toggleItemStatus(todoId){
		const modified = todoListItems.map(item=>{
			if (item.id === todoId){
				item.complete = !item.complete
			}
			return item
		})
		updateMainTodos(modified)
	}

	/**
	 * Filter all of the todo items that have been completed into their own list
	 */
	function clearComplete(){
		// the split arrays
		let incomplete = []

		todoListItems.forEach(item =>{
			if (item.complete){
				updateCompleted(completed => {
					return [...completed, {id:uuid(),text:item.text,complete:true} ]
				})
			} else {
				incomplete.push(item)
			}
		})
		updateMainTodos(incomplete);
	}

	// this will only activate once b/c the empty array doesn't contain any values and will thusly never change
	React.useEffect(
		()=>{
			if (local_todos_loaded === false){
				let existingValues = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	
				if (Array.isArray(existingValues)){
					if(existingValues.length > 0){
						updateMainTodos(existingValues);
					} else {
						// pop some default one's in there
						updateMainTodos(getDefaultTodos());
					}
				} else {
					// pop some default one's in there
					updateMainTodos(getDefaultTodos());
				}
			}

			local_todos_loaded = true
		}
		,[]
	)
	// save todo items in local memory so that they persist
	React.useEffect(
		// anonymous function to execute
		()=>{
			localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todoListItems))
		}
		// items to execute for / when changes have been made to said items
		,[todoListItems]
	)

	return (
		<>
			<Container>
				<Row className="justify-content-center pb-2">
					<Col>
						<div className="pb-2">
							<Form.Group>
								<Form.Control ref={newTodoWordText} type="text" placeholder="What's new todo?"></Form.Control>
							</Form.Group>
						</div>
						<div className="text-center">
							<Button variant="primary" onClick={addTodoItem}>Add New</Button>
							<Button variant="warning" onClick={clearComplete}>Clear List</Button>
						</div>
					</Col>
				</Row>
				<Row className="justify-content-left border border-info">
					<Col className="m-1">
						<TodoList todoItems={todoListItems} toggleItemStatus={toggleItemStatus}/>
					</Col>
					<Col className="m-1">
						<Completed todoItems={completedTodos} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

/**
 * Contains the default page setup todo items
 * @returns Array
 */
function getDefaultTodos(){
	return [
		{id: 1, text: `I'm a todo guys!`, complete: false}
		,{id: 2, text: `Here's another one`, complete: false}
		,{id: 3, text: `Number 3 coming 'round.`, complete: false}
		,{id: 4, text: `are new items not being added?`, complete: false}
	]
}

export default App;
