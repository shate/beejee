/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet, Text,
  View,
} from 'react-native'

import Header from "./src/components/header"
import Modals from "./src/components/modals"
import { useSelector } from "react-redux"
import { useGetTasksQuery } from "./store/api"
import GestureRecognizer from 'react-native-swipe-gestures'
import Todo from "./src/components/todo"

function App() {
  const [swipe, setSwipe] = useState('')
  const queryParams = useSelector(state => state.filter.data)
  const {data, isLoading, isError} = useGetTasksQuery(queryParams)
  const count = Math.ceil(data?.message.total_task_count / 3)


  useEffect(() => {
    setSwipe('')

  }, [queryParams.page])

  return (
    <SafeAreaView style={{position: 'relative'}}>
      <Header
        count={count}
        swipe={swipe}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}
      >
        <View style={styles.sectionContainer}>
          <GestureRecognizer
            onSwipeRight={() => setSwipe('right')}
            onSwipeLeft={() => setSwipe('left')}
          >
            {
              isLoading && <Text>Загрузка...</Text>
            }
            {
              isError && <Text>Ошибка загрузки</Text>
            }
            {
              data?.message.tasks.map(item => <Todo task={item} key={item.id} />)
            }
          </GestureRecognizer>
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
