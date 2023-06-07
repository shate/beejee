import React, { useState } from 'react'
import Todo from "./todo"
import { useGetTasksQuery } from "../../store/api"
import { FlatList, StyleSheet, Text } from "react-native"

export default function TodoList() {

  const [page, setPage] = useState(1)
  const {data, isLoading, isError} = useGetTasksQuery({
    page
  })
  const count = Math.ceil(data?.message.total_task_count/3)
  console.log('page',page)
  const pagination = () => {
    console.log('bbbbb', page < count)
    if(page < count){
      setPage( prev => prev + 1)
    }
  }

  console.log(count)

  if(isLoading) return <Text>Загрузка...</Text>
  if(isError) return <Text>Ошибка загрузки</Text>

  return (
    data &&
      <FlatList
      data={ data.message.tasks}
      renderItem={ item => <Todo task={item.item} key={item.item.email} />}
      keyExtractor={item => item.id}
      onEndReachedThreshold={0.01}
      onEndReached={pagination}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  }
})

