import React from 'react'
import numeral from 'numeral'
import { Span } from '../components/styled'

interface currency {
  number: number
  currencySign?: boolean
  style?: React.CSSProperties
  backSign?: boolean
}

export const getFloatNumber = (number: any, isTwoDecimal: boolean) =>
  isTwoDecimal ? parseFloat(parseFloat(number).toFixed(2)) : parseFloat(number)

export const Currency = ({
  number,
  currencySign = false,
  backSign = false,
  style,
  ...rest
}: currency) => {
  let res: any
  if (number || number === 0)
    res = `${numeral(number)
      .format('$0,0.00')
      .replace('$', currencySign ? '₹' : '')}`
  else {
    res = 'N.A.'
  }
  return (
    <Span style={{ ...style }}>
      {res}
      {backSign ? '/-' : null}
    </Span>
  )
}
function commaPutter(num: number) {
  if (num.toString().length < 4) {
    return num
  }
  let thou = num % 1000
  let rem = `${(num - thou) / 1000}`
  let isRemEv = rem.length % 2
  let formatted = rem
    .split('')
    .map((m, i) => (i % 2 !== isRemEv ? `${m},` : m))
    .join('')
  return `${formatted}${thou}`
}

export const currency = ({ num, showCurrency, invalidText = '-' }: any) => {
  if (isNaN(num)) {
    return invalidText
  }
  let decimals = parseFloat(num).toFixed(2).split('.')[1]
  if (showCurrency) {
    return `${commaPutter(parseInt(num))}${decimals}`
  }
}
