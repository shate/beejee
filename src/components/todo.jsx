import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from "react-native"
import {  useSelector } from "react-redux"
import EditTodoForm from "./editTodoForm"

export default function Todo({task}) {

  const isAdmin = useSelector(state => Boolean(state.auth.token))
  const [editable, setEditable] = useState(false)

  const options = [
    {name: 'Задача не выполнена', id: 0},
    {name: 'Задача не выполнена, отредактирована админом', id: 1},
    {name: 'Задача выполнена', id: 10},
    {name: 'Задача отредактирована админом и выполнена', id: 11},
  ]
  const defaultOption = options.find(item => item.id === task.status)

  useEffect(()=> {

     if(!isAdmin)  {
       setEditable(false)
     }
  }, [isAdmin])

  return (
    <View style={[styles.container]}>
      <View>
        {
          isAdmin
            ? <View style={styles.edit}>
              <Button title={'Редактировать'} onPress={() => setEditable(!editable)} />
            </View>
            : null
        }
        <View style={styles.info}>
          <View>
            <Text style={styles.label}>Исполнитель:</Text>
            <View>
              <Text style={styles.label}>{task.username}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Email:</Text>
            <View>
              <Text style={styles.label}>{task.email}</Text>
            </View>
          </View>
        </View>
      </View>
      {
        editable
          ? <EditTodoForm
            styles={styles}
            task={task}
            options={options}
            defaultOption={defaultOption.id}
          />
          : <View>
            <Text style={styles.label}>Что сделать:</Text>
            <View style={editable && styles.wrap}>
              <Text style={styles.label}>{task.text}</Text>
            </View>
            <View>
              <Text style={styles.label}>{defaultOption.name}</Text>
            </View>
          </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5d6869',
    marginVertical: 10,
    padding: 10,
    minHeight:'30%'
  },
  info: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff',
    padding: 3,
    marginBottom: 5
  },
  wrap: {
    borderColor: '#fff',
    borderWidth: 1,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  controls: {
    marginTop: 20,
    marginBottom: 10,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btns: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btn: {
    marginLeft: 10,
  },
  hidden: {
    display: "none"
  },
  edit: {
    marginBottom: 20
  }
})
