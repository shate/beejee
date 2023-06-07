import React, { useEffect, useState } from 'react'
import { Field, Formik, useFormik } from "formik"
import { Button, Text, TextInput, View } from "react-native"
import Dropdown from 'react-native-input-select'
import { useEditTaskMutation } from "../../store/api"

export default function EditTodoForm({task, styles, options, defaultOption}) {

  const [status, setStatus] = useState()
  const [text, onChangeText] = useState(task.text)

  useEffect(() => {
    setStatus(defaultOption)
  }, [])
  const [editTask, {isError, isSuccess}] = useEditTaskMutation()

  const handleAddTask = async () => {
    await editTask({
      status,
      text,
      id: task.id
    })
  }
  return (

      <>
        <View>
          <Text style={styles.label}>Что сделать:</Text>
          <View style={styles.wrap}>
            <TextInput
              style={styles.text}
              editable
              multiline
              maxLength={100}
              value={text}
              onChangeText={value => onChangeText(value)}

            />
          </View>
        </View>
        <View>
          <Dropdown
            label="Статус"
            options={options}
            optionLabel={'name'}
            optionValue={'id'}
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
            primaryColor={'green'}
            placeholder=''
          />
        </View>
        <View style={styles.btns}>
          <View style={styles.btn}>
            <Button title={'Сохранить'} onPress={handleAddTask} />
          </View>
          <View style={styles.btn}>
            <Button title={'Отменить'} onPress={() => {
               onChangeText(task.text)
              setStatus(task.status)
            }
            } />
          </View>
        </View>
      </>

  )
}
