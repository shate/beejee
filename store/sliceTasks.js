import { createSlice } from "@reduxjs/toolkit"

const todoSlice = createSlice({
  name: 'tasks',
  initialState: {
    todos: [
      {
        "id": 1,
        "username": "Test User",
        "email": "test_user_1@example.com",
        "text": "Hello, world!",
        "status": 10,
      },
      {
        "id": 3,
        "username": "Test User 2",
        "email": "test_user_2@example.com",
        "text": "Hello from user 2!",
        "status": 0,
      },
    ]
  },
  reducers: {
    setTask(state, action) {
      console.log(action)
    },

    deleteTodo(state, action) {
      const filteredArr = state.todos.filter(item => item.id !== action.payload.id)
      state.todos = filteredArr
    },
    toggleStatus(state, action) {
      const arr = state.todos.map(item => {
        if (item.id === action.id) {
          item.isCompleted = !item.isCompleted
        }
        return item
      })
      state.todos = arr
    }
  }
})
export const {setTask, deleteTodo, toggleStatus} = todoSlice.actions

export default todoSlice.reducer
