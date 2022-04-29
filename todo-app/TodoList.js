import React from "react";
import { ListGroup } from "react-bootstrap";
import TodoListItem from "./TodoListItem";

export default function TodoList({todoItems,toggleItemStatus}) {
    return (
        <div>
            <h6>Incomplete</h6>
            <ListGroup>
                {todoItems.map(item => { 
                    return <TodoListItem key={item.id} item={item} toggleItemStatus={toggleItemStatus}/>
                })}
            </ListGroup>
        </div>
    )
}