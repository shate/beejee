/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import Header from "./src/components/header"
import TodoList from "./src/components/todoList"
import Modals from "./src/components/modals"
import { useSelector } from "react-redux"
import { useGetTasksQuery } from "./store/api"
function App() {

  const queryParams = useSelector ( state => state.filter.data)
  const {data, isLoading, isError} = useGetTasksQuery(queryParams)
  const count = Math.ceil(data?.message.total_task_count / 3)

  return (
      <SafeAreaView style={{position: 'relative'}}>
        <Header count={count} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scroll}
        >
          <View style={styles.sectionContainer}>
            <TodoList
              data={data.message.tasks}
              isLoading={isLoading}
              isError={isError}
            />
          </View>
        </ScrollView>
        <Modals />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  scroll: {
    marginBottom: 80,
    position: 'relative'
  }
})

export default App
