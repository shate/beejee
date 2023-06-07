import React, { useEffect, useState } from 'react'
import { Modal, View, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../../store/modalsSlice"
import LoginForm from "./loginForm"
import CreateTaskForm from "./createTask"

export default function Modals() {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modals.showModal)
  const showAddTask = useSelector(state => state.modals.showAddTask)
  const showLogin = useSelector(state => state.modals.showLogin)

  const [modalVisible, setModalVisible] = useState(false)
  const [addTask, setAddTask] = useState(false)
  const [login, setLogin] = useState(false)

  useEffect(() => {
    setModalVisible(showModal)
  }, [showModal])

  useEffect(() => {
    setAddTask(true)
    setLogin(false)
  }, [showAddTask])

  useEffect(() => {
    setAddTask(false)
    setLogin(true)
  }, [showLogin])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => dispatch(hideModal())}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {
              login ? <LoginForm /> : null
            }
            {
              addTask ? <CreateTaskForm /> : null
            }

          </View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  modalView: {

    flexDirection: 'row',
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

