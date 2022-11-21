import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import Cookie from 'universal-cookie'
import firebase from '../firebaseCofig'

export let unSubMeta: () => void

export const useUserChanged = () => {
  const cookie = new Cookie()
  const router = useRouter()
  const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true)
        const idTokenResult = await user.getIdTokenResult()
        const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY]
        if (hasuraClaims) {
          cookie.set('token', token, { path: '/' })
          void router.push('/tasks')
        } else {
          const userRef = firebase.firestore().collection('user_meta').doc(user.uid)
          unSubMeta = userRef.onSnapshot(async () => {
            const tokenSnap = await user.getIdToken(true)
            const idTokenResultSnap = await user.getIdTokenResult()
            const hasuraClaimsSnap = idTokenResultSnap.claims[HASURA_TOKEN_KEY]
            if (hasuraClaimsSnap) {
              cookie.set('token', tokenSnap, { path: '/' })
              void router.push('/tasks')
            }
          })
        }
      }
    })
    return () => {
      unSubUser()
    }
  }, [router, cookie])
  return {}
}
