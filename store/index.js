import { configureStore } from "@reduxjs/toolkit"
import modals from './modalsSlice'
import auth from './authSlice'
import filter from './filterSlice'
import { tasksApi } from './api'

const store = configureStore({
  reducer: {
    modals,
    auth,
    filter,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
  serializableCheck: false
})
export default store
