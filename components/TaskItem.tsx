import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useAppMutate } from '../hooks/useAppMutate'
import { setEditedTask } from '../slices/uiSlice'
import { Task } from '../types/types'

interface TaskItemProps {
  task: Task
}

const TaskItem: FC<TaskItemProps> = memo(({ task }) => {
  const dispatch = useDispatch()
  const { deleteTaskMutation } = useAppMutate()
  if (deleteTaskMutation.isLoading) {
    return <p>Deleting...</p>
  }
  if (deleteTaskMutation.error) {
    return <p>Error</p>
  }

  return (
    <li className="my-3">
      <span className="font-bold">{task.title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          onClick={() => {
            dispatch(setEditedTask({ id: task.id, title: task.title }))
          }}
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
        />
        <TrashIcon
          onClick={() => deleteTaskMutation.mutate(task.id)}
          className="h-5 w-5 text-blue-500 cursor-pointer"
        />
      </div>
    </li>
  )
})

export default TaskItem
