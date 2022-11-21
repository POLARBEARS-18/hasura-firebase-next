import { FC, memo } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import NewsItem from './NewsItem'

const NewsList: FC = memo(() => {
  const { status, data } = useQueryNews()
  if (status === 'loading') return <div>Loading...</div>

  if (status === 'error') return <div>Error</div>
  return (
    <div>
      {data?.map((news) => (
        <div key={news.id}>
          <ul>
            <NewsItem news={news} />
          </ul>
        </div>
      ))}
    </div>
  )
})

export default NewsList
