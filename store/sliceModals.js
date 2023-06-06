import { createSlice } from "@reduxjs/toolkit"

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    showModal: false,
    showAddTask: false,
    showLogin: false
  },
  reducers: {
    hideModal(state) {
      state.showModal = false
      state.showAddTask = false
      state.showLogin = false
    },
    setShowAddTask(state) {
      state.showModal = true
      state.showAddTask = true
      state.showLogin = false
    },
    setShowLogin(state) {
      state.showModal = true
      state.showAddTask = false
      state.showLogin = true
    }
  }
})

export const {hideModal, setShowAddTask, setShowLogin} = modalsSlice.actions

export default modalsSlice.reducer
