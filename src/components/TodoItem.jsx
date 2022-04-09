import React from 'react'

export default function TodoItem({ taskToAdd, onCompletion, upperArrow, lowerArrow}) {

    function handleCheck(){

        onCompletion(taskToAdd.id)

    }

    function upTask(){

        upperArrow(taskToAdd)

    }

    function downTask(){

        lowerArrow(taskToAdd)

    }

    return( 

        <li className ='item'> 

            <input className="taskStatus" type="checkbox" checked = {taskToAdd.complete} onChange= {handleCheck}/>
            <h3 contentEditable="true" className='taskName'  suppressContentEditableWarning={true}> {taskToAdd.name} </h3>
            <button onClick = {upTask}>  &#8593;  </button>
            <button onClick = {downTask}>  &#8595;  </button>


        </li>

    )

}
