import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { setShowAddTask, setShowFilter, setShowLogin } from "../../store/modalsSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setToken } from "../../store/authSlice"
import Navigation from "./navigation"

export default function Header({count, swipe}) {

  const [isAdmin, setIsAdmin] = useState(false)
  const [copyToken, setCopyToken] = useState(false)
  const dispatch = useDispatch()
  const getToken = () => {
    AsyncStorage.getItem('token').then(res => {
      if (res && res.length) {
        const obj = JSON.parse(res)
        const currentTime = Date.now()
        const diff = Math.floor((currentTime - obj.time) / 3600000)
        if (diff < 24) {
          dispatch(setToken(obj.token))
          setCopyToken(obj.token)
          setIsAdmin(true)

        } else {
          AsyncStorage.setItem('token', '')
        }
      }
    })
  }
  useEffect(() => {
    getToken()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title={'Добавить задачу'} onPress={() => dispatch(setShowAddTask())} />
        <Button title={'Фильтры'} onPress={() => dispatch(setShowFilter())} />
        <Button title={isAdmin ? 'Выйти' : 'Войти'} onPress={() => {
          if (isAdmin) {
            setIsAdmin(false)
            dispatch(setToken(false))
          } else {
            if (copyToken) {
              setIsAdmin(true)
              dispatch(setToken(copyToken))
            } else {
              dispatch(setShowLogin())
            }
          }
        }} />

      </View>
      <Navigation
        count={count}
        swipe={swipe}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
