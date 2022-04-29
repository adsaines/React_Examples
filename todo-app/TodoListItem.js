import React from "react";
import { Form } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

export default function TodoListItem({item,toggleItemStatus,lockItem}) {
    /**
     * Pass the item id up the chain to flip the value in the page level variable
     * @param {Object} eve 
     */
    function passIdUp(eve){
        toggleItemStatus(item.id)
    }

    return (
        <ListGroup.Item>
            <Form.Check type="checkbox" onChange={passIdUp} label={item.text} checked={item.complete} disabled={lockItem}></Form.Check>
        </ListGroup.Item>
    )
}