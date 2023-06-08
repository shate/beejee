/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react'

import {
  FlatList,
  SafeAreaView,
  StyleSheet, Text, View,

} from 'react-native'

import Header from "./src/components/header"
import Modals from "./src/components/modals"
import { useGetTasksQuery } from "./store/api"
import Todo from "./src/components/todo"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "./store/filterSlice"

function App() {

  const dispatch = useDispatch()
  const queryParams = useSelector ( state => state.filter.data)
  const {data, isLoading, isError} = useGetTasksQuery(queryParams)
  const count = Math.ceil(data?.message.total_task_count / 3)
  const flatListRef = useRef()
  const [copyPage, setCopyPage] = useState(1)

  console.log(queryParams)

  const pagination = () => {
  //  console.log('bbbbb', page < count)
    if (copyPage < count) {
      setCopyPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    dispatch(setPage(copyPage))
    },
    [copyPage]
  )

  if (isLoading) return <Text>Загрузка...</Text>
  if (isError) return <Text>Ошибка загрузки</Text>
  const ItemSeparatorView = () => <View style={styles.separator} />

  return (

      <SafeAreaView style={styles.sectionContainer}>
        <Header />
        {
          data ?  <FlatList
            ref={flatListRef}
            data={data.message.tasks}
            renderItem={item => <Todo task={item.item} key={item.item.email} />}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.01}
            onEndReached={pagination}
            contentContainerStyle={styles.container}
            ItemSeparatorComponent={ItemSeparatorView}
          />
            : null
        }

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
