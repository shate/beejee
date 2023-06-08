import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
     data: {
       page: 1,
       sort_field: '',
       sort_direction: ''
     }
  },
  reducers: {
    setPage(state, action) {
      state.data.page = action.payload
    },
    setField(state, action) {
      state.data.sort_field = action.payload
    },
    setDirection(state, action) {
      state.data.sort_direction = action.payload
    },
  }
})

export const {setPage, setField, setDirection} = filterSlice.actions

export default filterSlice.reducer
