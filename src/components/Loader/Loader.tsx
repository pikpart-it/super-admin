import React from 'react'
import styled from 'styled-components'
import { FlexDiv } from '../../style/styled'
import { CircularProgress } from '@mui/material'

const MLoader = styled(FlexDiv)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
interface LI {
  isLoading: boolean
  variant?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
  contain?: boolean
}

function Loader({ isLoading, variant, contain }: LI) {
  return (
    <MLoader>
      {isLoading ? (
        <CircularProgress
          style={{
            color: 'rgb(219,89,45)',
          }}
        />
      ) : null}
    </MLoader>
  )
}

export default Loader
