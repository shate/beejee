import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { setShowAddTask, setShowFilter, setShowLogin } from "../../store/modalsSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setToken } from "../../store/authSlice"
import { Dropdown } from 'react-native-element-dropdown';

export default function Header() {

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

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
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
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
