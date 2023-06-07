import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { setShowAddTask, setShowLogin } from "../../store/modalsSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setToken } from "../../store/authSlice"

export default function Header() {

  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      if (res && res.length) {
        setIsAdmin(true)
        const obj = JSON.parse(res)
        const currentTime = Date.now()
        const diff = Math.floor((currentTime- obj.time)/3600000)
        if(diff < 24){
          dispatch(setToken(obj.token))
        }
        else{
          AsyncStorage.setItem('token', '')
        }
      }
    })
  }, [])

  return (
    <View style={styles.header}>
          <Button title={'Добавить задачу'} onPress={() => dispatch(setShowAddTask())} />
          <Button title={isAdmin ? 'Выйти' : 'Войти'} onPress={() => {
            if(isAdmin){
              setIsAdmin(false)
              dispatch(setToken(false))
            }
            else{
              dispatch(setShowLogin())
            }
          }} />
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
