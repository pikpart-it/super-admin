import React from 'react'
import styled from 'styled-components'
import { FlexDiv } from './styled'
import { Span } from '../components/styled'

const Details = styled.details`
  border-bottom: 1px solid ${(props: any) => props.theme.colors.gray4};
  position: relative;
  padding: 0 2vw;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
`

const Summary = styled.summary`
  outline: none;
  user-select: none;
  cursor: pointer;
  position: relative;
  label {
    font-weight: 500;
  }
  &::-webkit-details-marker {
    color: ${(props: any) => props.theme.colors.gray6};
    background: transparent;
    margin-top: 32px;
    margin-left: 95%;
    position: absolute;
  }
  &::marker {
    color: transparent;
    background: transparent;
    margin-top: 32px;
    margin-left: 95%;
    position: absolute;
  }
`

export function Accordion({
  icon,
  heading,
  value,
  children,
  styles,
  onClick,
  headerChildren,
  ...rest
}: any) {
  return (
    <Details {...rest} style={styles?.container}>
      <Summary>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          style={{ padding: '15px 2vw' }}
          onClick={onClick}>
          {icon && (
            <Span variant="h6" style={{ marginRight: '1vw' }}>
              {icon}
            </Span>
          )}
          <p style={{ ...styles?.heading, width: '150px', fontSize: '14px' }}>{heading}</p>
          <Span variant="h6" style={{ marginRight: '2.2vmax', whiteSpace: 'nowrap' }}>
            {value}
          </Span>
        </FlexDiv>
        {headerChildren && (
          <FlexDiv alignItemsCenter justifyContentSpaceBetween style={{ padding: '15px 2vw' }}>
            <Span variant="h6" style={{ marginRight: '2.2vmax', whiteSpace: 'nowrap' }}>
              {headerChildren}
            </Span>
          </FlexDiv>
        )}
      </Summary>
      {children}
    </Details>
  )
}
