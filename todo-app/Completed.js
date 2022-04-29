import React from "react";
import { ListGroup } from "react-bootstrap";
import TodoListItem from "./TodoListItem";

export default function Completed({todoItems}) {
    return (
        <div>
            <h6>Completed</h6>
            <ListGroup>
                {todoItems.map(item => { 
                    return <TodoListItem key={item.id} item={item} lockItem={true} />
                })}
            </ListGroup>
        </div>
    )
}