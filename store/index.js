import { configureStore } from "@reduxjs/toolkit"
import tasks from './sliceTasks'
import modals from './sliceModals'
import api from './sliceApi'

const store = configureStore({
  reducer: {
    tasks,
    modals,
    api
  }
})
export default store
