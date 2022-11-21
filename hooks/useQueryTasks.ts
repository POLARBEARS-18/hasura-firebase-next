import { GraphQLClient } from 'graphql-request'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import Cookies from 'universal-cookie'
import { GET_TASKS } from '../queries/queries'
import { Task } from '../types/types'

const cookie = new Cookies()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

interface TasksRes {
  tasks: Task[]
}

const fetchTasks = async () => {
  const { tasks: data } = await graphQLClient.request<TasksRes>(GET_TASKS)
  return data
}

export const useQueryTasks = () => {
  const token = cookie.get('token') as string
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }, [token])
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    staleTime: 0,
  })
}
