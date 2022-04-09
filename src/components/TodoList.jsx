import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ tasks, taskCompletion, raiseFx, lowerFx }) {

    return(  

        <ul className = "list">{
            tasks.map(task => {

                return( <TodoItem key={task.id} taskToAdd = {task}  onCompletion = {taskCompletion} upperArrow = {raiseFx} lowerArrow = {lowerFx}  /> )

            })
        }</ul>


    )


}
