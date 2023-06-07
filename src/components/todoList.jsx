import React from 'react'
import Todo from "./todo"
import { useGetTasksQuery } from "../../store/api"
import { Text } from "react-native"

export default function TodoList() {

  const {data, isLoading, isError} = useGetTasksQuery()
  const count = data?.message.total_task_count

  if(isLoading) return <Text>Загрузка...</Text>
  if(isError) return <Text>Ошибка загрузки</Text>

  return (
    data.message.tasks.map(item => {
      return <Todo task={item} key={item.email} />
    })
  )
}
