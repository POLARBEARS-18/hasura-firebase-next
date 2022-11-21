import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import { LogoutIcon, ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useLogout } from '../hooks/useLogout'
import firebase from '../firebaseCofig'
import NewsList from '../components/NewsList'
import NewsEdit from '../components/NewsEdit'
import TaskList from '../components/TaskList'
import TaskEdit from '../components/TaskEdit'

const Tasks: FC = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const user = firebase.auth().currentUser
  return (
    <Layout title="tasks">
      <p className="my-3">{user?.email}</p>
      <LogoutIcon
        className="h-5 w-5 my-3 text-blue-500 cursor-pointer"
        onClick={() => {
          void logout()
          void router.push('/')
        }}
      />
      <p className="mt-10 mb-5 text-blue-500 text-xl font-bold">News Edit</p>
      <div className="grid grid-cols-2 gap-40">
        <NewsList />
        <NewsEdit />
      </div>
      <p className="mt-10 mb-5 text-blue-500 text-xl font-bold">Task Edit</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskList />
        <TaskEdit />
      </div>

      <Link href="/">
        <div className="mt-20 flex items-center cursor-pointer">
          <ChevronDoubleLeftIcon className="h-5 w-5 mx-1 text-blue-500" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Tasks
