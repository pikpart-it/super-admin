import React from 'react'
import { FlexDiv } from '../../style/styled'
import { Span } from '../styled'

interface MSG {
  variant: 'success' | 'danger'
  msg: string
  style?: {
    container?: React.CSSProperties
    body?: React.CSSProperties
  }
  card?: boolean
  ghost?: boolean
}

function MsgCard({ variant, msg, card, ghost, style }: MSG) {
  let color = '#ED382B'
  if (variant === 'success') {
    color = '#51A846'
  } else {
    color = '#ED382B'
  }
  let top = -100
  if (msg) {
    top = 50
  }

  return card ? (
    <FlexDiv
      justifyContentCenter
      alignItemsCenter
      style={{
        width: 200,
        position: 'fixed',
        top: top,
        right: 20,
        background: ghost ? '#fff' : color,
        border: ghost ? `2px solid ${color}` : 'none',
        transition: '0.5s',
        padding: 20,
        borderRadius: 10,
        minWidth: 'fit-content',
        ...style?.container,
      }}>
      <Span
        color={ghost ? color : '#fff'}
        style={{ ...style?.body, fontWeight: ghost ? 400 : 600 }}>
        {msg}
      </Span>
    </FlexDiv>
  ) : (
    <FlexDiv width="100%" justifyContentCenter alignItemsCenter style={style?.container}>
      <Span variant={variant} style={style?.body}>
        {msg}
      </Span>
    </FlexDiv>
  )
}

export default MsgCard
