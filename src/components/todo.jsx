import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Switch } from "react-native"
import { useDispatch, useSelector } from "react-redux"

export default function Todo({item}) {

  const isAdmin = useSelector(state => state.api.isAdmin )
  const [editable, setEditable] = useState(false)
  const [task, onChangeText] = useState(item)
  const [isEnabled, setIsEnabled] = useState(Boolean(item.status))

  const dispatch = useDispatch()

  return (
    <View style={[styles.container, isEnabled && styles.completed]}>
      <View>
        {
         ! isAdmin
          ? <View style={styles.edit}>
              <Button title={'Редактировать'} onPress={() => setEditable(!editable)}/>
            </View>
           : null
        }
        <View style={styles.info}>
          <View>
            <Text style={styles.label}>Исполнитель:</Text>
            <View>
              <TextInput
                style={styles.text}
                maxLength={100}
                value={task.username}
                editable={false}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Email:</Text>
            <View>
              <TextInput
                style={styles.text}
                maxLength={100}
                value={task.email}
                editable={false}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Что сделать:</Text>
          <View style={editable && styles.wrap}>
            <TextInput
              style={styles.text}
              editable={editable}
              multiline
              maxLength={100}
              value={task.text}
              onChangeText={value => onChangeText({...task, text: value})}
            />
          </View>
        </View>
      </View>
      {
        editable
        ?  <View style={ styles.controls}>
            <View style={styles.switch}>
              <View style={editable && styles.wrap}>
              <TextInput
                style={styles.text}
                editable={editable}
                value={task.status}
                keyboardType="numeric"
                onChangeText={value => onChangeText({...task, status: value})}
              />
              </View>

              <Text style={[styles.label, styles.switchLabel]}>Статус</Text>
            </View>
            <View style={styles.btns}>
              <View style={styles.btn}>
                <Button title={'Сохранить'} onPress={() => dispatch()} />
              </View>
              <View style={styles.btn}>
                <Button title={'Отменить'} onPress={() => {
                  onChangeText(item)
                  setIsEnabled(Boolean(item.status))
                }
                } />
              </View>
            </View>
          </View>
         : null
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5d6869',
    marginBottom: 10,
    padding: 10,
  },
  completed: {
    backgroundColor: '#2f96a4',
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
  switch: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switchLabel: {
    marginTop: 4
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
