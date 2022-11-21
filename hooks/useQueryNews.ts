import request from 'graphql-request'
import { useQuery } from 'react-query'
import { GET_NEWS } from '../queries/queries'
import { News } from '../types/types'

interface NewsRes {
  news: News[]
}
export const fetchNews = async () => {
  const { news: data } = await request<NewsRes>(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, GET_NEWS)
  return data
}

export const useQueryNews = () =>
  useQuery<News[], Error>({
    queryKey: 'news',
    queryFn: fetchNews,
    staleTime: Infinity,
  })
