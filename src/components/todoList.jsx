import React from 'react'
import { useSelector } from "react-redux"
import Todo from "./todo"

export default function TodoList() {

  const todos = useSelector(state => state.tasks.todos)

  return (
    todos?.map(item => {
      return <Todo item={item} key={String(item.id)} />
    })
  )
}
