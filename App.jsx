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
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'


import { Provider } from "react-redux";
import store from "./store";
import Header from "./src/components/header";
import TodoList from "./src/components/todoList"
import Modals from "./src/components/modals"

function App() {

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar />
        <Header />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scroll}
          >
          <View style={styles.sectionContainer}>
           <TodoList />
          </View>
        </ScrollView>
        <Modals />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 10,
  },
  scroll: {
    marginBottom: 70
  }
});

export default App;
