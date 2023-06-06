import React from 'react'
import { Button, StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { setShowAddTask, setShowLogin } from "../../store/sliceModals"

export default function Header() {

  const dispatch = useDispatch()

  return (
    <View style={styles.header}>
          <Button title={'Добавить задачу'} onPress={() => dispatch(setShowAddTask())} />
          <Button title={'Войти'} onPress={() => dispatch(setShowLogin())} />
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
