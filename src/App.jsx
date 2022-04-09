import React from 'react'
import './App.css'
import { Fragment } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoList from './components/TodoList'

export function App() {

    const [taskList, setTasks] = useState([]) 

    const taskInput = useRef()

    const LOCAL_STORAGE_KEY = 'taskApp.todolist'


    useEffect(() =>{
        
        const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

        if (storedTasks) setTasks(storedTasks)

    }, [])

    useEffect(() =>{

        var checkBoxes = document.getElementsByClassName('taskStatus')

        const updateTask = [...taskList]

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList))

        for (var i = 0; i < updateTask.length; i++){

            if (checkBoxes[i].checked === true){

                var itemParent = checkBoxes[i].parentElement
                itemParent.classList.add('checked')
                console.log(itemParent)

            }

            else{

                var itemParent = checkBoxes[i].parentElement
                itemParent.classList.remove('checked')

            }

        }

    }, [taskList])

    function handleAdd(e){

        const taskname = taskInput.current.value

        if (taskname === '') return

        setTasks(prevTasks => {

            return [...prevTasks, { id: uuidv4(), name: taskname, complete: false}]

        })

        taskInput.current.value = null

    }


    function taskCompletion(id){

        var checkBoxes = document.getElementsByClassName('taskStatus')

        const updateTask = [...taskList]
        const task = updateTask.find(task => task.id === id)
        task.complete = !task.complete

        
        for (var i = 0; i < updateTask.length; i++){

            if (checkBoxes[i].checked === true){

                var itemParent = checkBoxes[i].parentElement
                itemParent.classList.add('checked')

            }

            else{
                var itemParent = checkBoxes[i].parentElement
                itemParent.classList.remove('checked')

            }

        }

        setTasks(updateTask)

    }


    function handleEdit(){

        var names = document.getElementsByClassName('taskName')

        const updateTask = [...taskList]

        for (var i = 0; i < updateTask.length; i++){

            var newName = names[i].textContent
            
            updateTask[i].name = newName

            console.log(updateTask[i].name)

        }

        alert('Names updated succesfully')

        setTasks(updateTask)


    }

    function handleTaskClear(){

        const updateTaskList = taskList.filter(task => !task.complete)

        setTasks(updateTaskList)

    }


    function raiseTaskLevel(task){

        var updateTaskList = [...taskList]

        const originalIndex = updateTaskList.indexOf(task)

        if (originalIndex === 0){
            return
        }

        const newIndex = originalIndex - 1

        const taskToLower = updateTaskList[newIndex].valueOf()

        updateTaskList[newIndex] = task
        updateTaskList[originalIndex] = taskToLower
        task = taskToLower

        setTasks(updateTaskList)

    }

    function lowerTaskLevel(task){

        var updateTaskList = [...taskList]

        const originalIndex = updateTaskList.indexOf(task)

        if (originalIndex === updateTaskList.length - 1){
            return
        }

        const newIndex = originalIndex + 1

        const taskToRaise = updateTaskList[newIndex].valueOf()

        updateTaskList[newIndex] = task
        updateTaskList[originalIndex] = taskToRaise
        task = taskToRaise

        setTasks(updateTaskList)

    }


    return(

        <Fragment>

            <div className='appBox'>

                <div className="taskForm">
                    <h1 className='title'> To Do List </h1>
                    <input  className="input" ref = {taskInput} type="text" placeholder='Insert new task'/>
                    <button className="add" onClick = {handleAdd} > Add task </button> 
                    <button className="clear" onClick = {handleTaskClear}> Clear tasks </button> 
                </div>

                <TodoList tasks = {taskList} taskCompletion = {taskCompletion} raiseFx = {raiseTaskLevel} lowerFx = {lowerTaskLevel} />

                <button className='edit' onClick={handleEdit} > Update names </button>

                <h3 className="leftTodo"> {taskList.filter(task => !task.complete).length} tasks left! </h3>

            </div>


        </Fragment>
        
    )

}
