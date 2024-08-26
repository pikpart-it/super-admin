import React from 'react'
import { H2Heading } from '../../../components/styled'
import { FlexDiv, Section } from '../../../style/styled'
import PolicyDetails from '../components/PolicyDetails'
import { refundAndCancellation } from '../../../config/constants/policy'

function Refund() {
  return (
    <>
      <Section>
        <FlexDiv justifyContentCenter>
          <H2Heading>Refund and Cancellation Policy</H2Heading>
        </FlexDiv>
        <PolicyDetails data={refundAndCancellation} />
      </Section>
    </>
  )
}

export default Refund
