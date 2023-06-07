import React, { useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Formik } from 'formik'
import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../../store/modalsSlice"
import * as yup from "yup"
import { useAddTaskMutation } from "../../store/api"

export default function CreateTaskForm() {

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Не валидный email")
      .required('Поле является обязательным для заполнения'),
    username: yup
      .string()
      .required('Поле является обязательным для заполнения'),
    text: yup
      .string()
      .required('Поле является обязательным для заполнения'),
  })

  const timerRef = useRef(null)
  const showModal = useSelector(state => state.modals.showModal)
  const dispatch = useDispatch()
  const [addTask, {isError, isSuccess}] = useAddTaskMutation()

  useEffect(() => {
    if (!showModal) {
      return clearTimeout(timerRef.current)
    }
  }, [showModal])
  const handleAddTask = async (body) => {
    await addTask(body)
  }
  const closeModal = () => timerRef.current = setTimeout(() => dispatch(hideModal()), 500)

  if (isSuccess) {
    closeModal()
    return <Text>Ваша задача добавлена!</Text>
  }
  if (isError) {
    closeModal()
    return <Text>Задача не добавлена. Попробуйте еще раз</Text>
  }

  return (
    <View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', username: '', text: ''}}
        onSubmit={values => handleAddTask(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <View style={styles.wrap}>
              <Text>Исполнитель</Text>
              <TextInput
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                style={styles.input}
                placeholder="Введите имя"
              />
              {errors.username &&
                <Text style={{fontSize: 10, color: 'red'}}>{errors.username}</Text>
              }
            </View>
            <View style={styles.wrap}>
              <Text>Email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                keyboardType="email-address"
                placeholder="Введите Email"
              />
              {errors.email &&
                <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
              }
            </View>
            <View style={styles.wrap}>
              <Text>Задача</Text>
              <TextInput
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
                style={styles.input}
                placeholder="Текст задачи"
                multiline

              />
              {errors.text &&
                <Text style={{fontSize: 10, color: 'red'}}>{errors.text}</Text>
              }
            </View>
            <View style={styles.controls}>
              <Button onPress={() => dispatch(hideModal())} title="Отмена" />
              <View style={styles.separator} />
              <Button onPress={handleSubmit} title="Отправить" />
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    padding: 0,
  },
  wrap: {
    marginBottom: 20,
    maxWidth: 200
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
  separator: {
    width: 30
  }
})
