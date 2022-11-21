import { FC } from 'react'
import { SwitchVerticalIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import firebase from '../firebaseCofig'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

const Auth: FC = () => {
  const user = firebase.auth().currentUser
  const { isLogin, email, password, emailChange, pwChange, authUser, toggleMode } = useFirebaseAuth()
  return (
    <>
      <form onSubmit={authUser} className="mt-8 flex justify-center items-center flex-col">
        <label htmlFor="email" className="flex flex-col justify-center items-center">
          Email:
          <input
            type="text"
            value={email}
            onChange={emailChange}
            placeholder="email ?"
            className="my-3 px-3 py-1 border border-gray-300"
          />
        </label>

        <label htmlFor="password" className="flex flex-col justify-center items-center">
          Password:
          <input
            type="password"
            value={password}
            onChange={pwChange}
            placeholder="email ?"
            className="my-3 px-3 py-1 border border-gray-300"
          />
          <button
            type="submit"
            disabled={!email || !password}
            className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </label>
      </form>
      <SwitchVerticalIcon className="my-5 h-5 w-5 text-blue-500 cursor-pointer" onClick={toggleMode} />
      {user && (
        <Link href="/tasks">
          <div className="flex items-center cursor-pointer my-3">
            <ChevronDoubleRightIcon className="h-5 w-5 mx-1 text-blue-500" />
            <span>to tasks page</span>
          </div>
        </Link>
      )}
    </>
  )
}

export default Auth
