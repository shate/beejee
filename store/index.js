import { configureStore } from "@reduxjs/toolkit"
import modals from './modalsSlice'
import auth from './authSlice'
import { tasksApi } from './api'

const store = configureStore({
  reducer: {
    modals,
    auth,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})
export default store
