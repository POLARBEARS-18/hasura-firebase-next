import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useAppMutate } from '../hooks/useAppMutate'
import { setEditedNews } from '../slices/uiSlice'
import { News } from '../types/types'

interface NewsItemProps {
  news: News
}

const NewsItem: FC<NewsItemProps> = memo(({ news }) => {
  const dispatch = useDispatch()
  const { deleteNewsMutation } = useAppMutate()

  if (deleteNewsMutation.isLoading) {
    return <p>Deleting...</p>
  }
  if (deleteNewsMutation.error) {
    return <div>Error</div>
  }

  return (
    <li className="my-3">
      <span className="font-bold">{news.content}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          onClick={() => dispatch(setEditedNews({ id: news.id, content: news.content }))}
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
        />
        <TrashIcon
          onClick={() => deleteNewsMutation.mutate(news.id)}
          className="h-5 w-5 text-blue-500 cursor-pointer"
        />
      </div>
    </li>
  )
})

export default NewsItem
