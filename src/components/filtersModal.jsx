import React from 'react'
import { Button, StyleSheet, Text, View } from "react-native"
import { hideModal } from "../../store/modalsSlice"
import { useDispatch } from "react-redux"
import { setDirection, setField } from "../../store/filterSlice"
export default function FiltersModal() {

  const dispatch = useDispatch()
  const handler = (type = '', isField = '') => {
    dispatch(hideModal())

    if (type) {
      return isField ? dispatch(setField(type)) : dispatch(setDirection(type))
    }
    dispatch(setField(''))
    dispatch(setDirection(''))
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Сортировать по:</Text>
        <View style={styles.inner}>
          <Button title={'id'} onPress={() => handler('id', true)} />
          <Button title={'Имени'} onPress={() => handler('username', true)} />
          <Button title={'Email'} onPress={() => handler('email', true)} />
          <Button title={'Статусу'} onPress={() => handler('status', true)} />
        </View>

        <View style={[styles.inner, {marginBottom: 30}]}>
          <Button title={'Возрастанию'} onPress={() => handler('asc')} />
          <Button title={'Убыванию'} onPress={() => handler('desc')} />
        </View>
        <View>
          <View style={styles.inner}>
            <Button onPress={() => handler()} title="Сбросить" />
            <Button onPress={() => {
              dispatch(hideModal())
            }} title="Закрыть" />
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%'
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
})
