/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react'

import {
  FlatList,
  SafeAreaView,
  StyleSheet, Text, View,

} from 'react-native'

import Header from "./src/components/header"
import Modals from "./src/components/modals"
import { useGetTasksQuery } from "./store/api"
import Todo from "./src/components/todo"

function App() {

  const [page, setPage] = useState(1)
  const {data, isLoading, isError} = useGetTasksQuery({page})
  const count = Math.ceil(data?.message.total_task_count / 3)
  const flatListRef = useRef()

  const pagination = () => {
    console.log('bbbbb', page < count)
    if (page < count) {
      setPage(prev => prev + 1)
    }
  }

  if (isLoading) return <Text>Загрузка...</Text>
  if (isError) return <Text>Ошибка загрузки</Text>
  const ItemSeparatorView = () => <View style={styles.separator} />

  return (

      <SafeAreaView style={styles.sectionContainer}>
        <Header />
        <FlatList
          ref={flatListRef}
          data={data.message.tasks}
          renderItem={item => <Todo task={item.item} key={item.item.email} />}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.01}
          onEndReached={pagination}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={ItemSeparatorView}
        />
        <Modals />
      </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  separator: {
    height: 10,
    width: '100%'
  }
})

export default App
