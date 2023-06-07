/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,

} from 'react-native'

import { Provider } from "react-redux"
import store from "./store"
import Header from "./src/components/header"
import TodoList from "./src/components/todoList"
import Modals from "./src/components/modals"

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.sectionContainer}>
        <StatusBar />
        <Header />
        <TodoList />
        <Modals />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 10,
    flex: 1
  },
})

export default App
