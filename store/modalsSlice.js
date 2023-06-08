import { createSlice } from "@reduxjs/toolkit"

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    showModal: false,
    showAddTask: false,
    showLogin: false,
    showFilter: false,
  },
  reducers: {
    hideModal(state) {
      state.showModal = false
      state.showAddTask = false
      state.showLogin = false
      state.showFilter = false
    },
    setShowAddTask(state) {
      state.showModal = true
      state.showAddTask = true
      state.showLogin = false
      state.showFilter = false
    },
    setShowLogin(state) {
      state.showModal = true
      state.showAddTask = false
      state.showLogin = true
      state.showFilter = false
    },
    setShowFilter(state) {
      state.showModal = false
      state.showAddTask = false
      state.showLogin = false
      state.showFilter = true
    }
  }
})

export const {hideModal, setShowAddTask, setShowLogin, setShowFilter} = modalsSlice.actions

export default modalsSlice.reducer
