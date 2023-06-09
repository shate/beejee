import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from "react-redux"
import { hideModal } from "../../store/modalsSlice"
import { useAuthMutation } from "../../store/api"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setToken } from "../../store/authSlice"
export default function LoginForm() {

  const dispatch = useDispatch()
  const [auth] = useAuthMutation()
  const [error, setError] = useState('')
  const loginValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Поле является обязательным для заполнения'),
    username: yup
      .string()
      .required('Поле является обязательным для заполнения'),

  })
  const handleAuth = async (body) => {
    const login = await auth(body)
    console.log('login.data.message', login.data.status)
    if(login.data.status !== 'error'){
      setError('')
      console.log(login.data.message.token)
      AsyncStorage.setItem('token', JSON.stringify({
        token: login.data.message.token,
        time: Date.now()
      }))
      dispatch(setToken(login.data.message.token))
      dispatch( hideModal())
    }
    else{
      setError(login.data.message.password)
    }
  }

  return (
    <>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{username: '', password: ''}}
        onSubmit={values => handleAuth(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <View style={styles.wrap}>
              <Text>Логин</Text>
              <TextInput
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                style={styles.input}
                placeholder="Ваш логин"
              />
              {errors.username &&
                <Text style={{fontSize: 10, color: 'red'}}>{errors.username}</Text>
              }
            </View>
            <View style={styles.wrap}>
              <Text>Пароль</Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                placeholder="Введите пароль"
                keyboardType="numeric"
              />
              {errors.password &&
                <Text style={{fontSize: 10, color: 'red'}}>{errors.password}</Text>
              }
            </View>
            {
             error && <Text style={{fontSize: 10, color: 'red', marginTop: -10, marginBottom: 10}}>{error}</Text>
            }
            <View style={styles.controls}>
              <Button onPress={() => dispatch(hideModal())} title="Отмена" />
              <View style={styles.separator} />
              <Button onPress={handleSubmit} title="Отправить" />
            </View>
          </View>
        )}
      </Formik>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    padding: 0,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  controls: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrap: {
    marginBottom: 20,
    maxWidth: 200
  },
  separator: {
    width: 30
  }
})
