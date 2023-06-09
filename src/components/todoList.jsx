import React from 'react'
import Todo from "./todo"
import { Text } from "react-native"

export default function TodoList({data, isLoading, isError}) {

  if (isLoading) return <Text>Загрузка...</Text>
  if (isError) return <Text>Ошибка загрузки</Text>

  return (
    data.map(item => {
      return <Todo task={item} key={item.id} />
    })
  )
}
