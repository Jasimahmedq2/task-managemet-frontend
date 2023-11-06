import { Api } from "../api";

const taskApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `/task/create-task`,
        headers: {
          Authorization: `${data?.token}`,
        },
        method: "POST",
        body: data.info,
      }),
      invalidatesTags: ["task"],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/task/update-task/${data.taskId}`,
        headers: {
          Authorization: `${data?.token}`,
        },
        method: "PATCH",
        body: data.info,
      }),
      invalidatesTags: ["task"],
    }),
    removeTask: builder.mutation({
      query: (data) => ({
        url: `/task/remove-task/${data.taskId}`,
        headers: {
          Authorization: `${data?.token}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
    getUserTask: builder.query({
      query: (token) => ({
        url: `/task/get-tasks`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetUserTaskQuery,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} = taskApi;
