import { Fragment } from 'react'
import Router from './router'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function App() {
  return (
    <Fragment>
      <GoogleOAuthProvider clientId='901151632118-i2kjppeplto5aded09fljgilvnhuneme.apps.googleusercontent.com'>
        <Router />
      </GoogleOAuthProvider>
    </Fragment>
  )
}
