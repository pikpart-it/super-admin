import React from 'react'
import { FlexDiv } from './style/styled'
import { Link } from 'react-router-dom'

function ErrorPages(props: any) {
  React.useEffect(() => {
    if (props.location.pathname === '/') {
      // props.history.replace('/')
    }
  }, [])
  return (
    <FlexDiv column width="100%" alignItemsCenter justifyContentCenter style={{ height: '100vh' }}>
      <h1>Url Not Found</h1>
      <FlexDiv alignItemsCenter>
        Visit
        <Link style={{ textDecoration: 'none' }} to="/">
          Home
        </Link>
        or
      </FlexDiv>
      <Link style={{ textDecoration: 'none' }} to="/login">
        Login
      </Link>
    </FlexDiv>
  )
}

export default ErrorPages
