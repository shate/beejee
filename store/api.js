import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({baseUrl: 'https://uxcandy.com/~shapoval/test-task-backend/v2'}),
  endpoints: build => ({
    getTasks: build.query({
      query: () => '/?developer=Name',
      providesTags: (result) =>
        result.message.task
          ? [
            result.message.task.map(({ id }) => ({ type: 'Tasks', id })),
            { type: 'Tasks', id: 'LIST' },
          ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    addTask: build.mutation({
      query: (body) => {
        const data = new FormData()
        data.append("username", body.username)
        data.append("email", body.email)
        data.append("text", body.text)
        return {
          url: '/create?developer=Example',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),

    editTask: build.mutation({
      query: (body) => {
        const data = new FormData()
        data.append("text", body.text)
        data.append("status", body.status)
        data.append("token", body.token)
        return {
          url: `/edit/:${body.id}?developer=Example`,
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),

    auth: build.mutation({
      query: (body) => {
        console.log('body', body)
        const data = new FormData()
        data.append("username", body.username)
        data.append("password", body.password)
        return {
          url: '/login?developer=Example',
          method: 'POST',
          body: data
        }
      },
    })
  })
})
export const {useGetTasksQuery, useAddTaskMutation, useEditTaskMutation, useAuthMutation} = tasksApi


