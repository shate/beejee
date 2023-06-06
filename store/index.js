import { configureStore } from "@reduxjs/toolkit"
import modals from './sliceModals'
import api, { tasksApi } from './api'

const store = configureStore({
  reducer: {
    modals,
    api,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})
export default store
