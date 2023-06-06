import { createSlice } from "@reduxjs/toolkit"

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    isAdmin: false
  },
  reducers: {
    auth(state, action) {
      console.log(action)
    }
  }
})

export const {auth} = apiSlice.actions

export default apiSlice.reducer
