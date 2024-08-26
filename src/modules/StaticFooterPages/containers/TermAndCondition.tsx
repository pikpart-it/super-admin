import React from 'react'
import { H2Heading } from '../../../components/styled'
import { FlexDiv, Section } from '../../../style/styled'
import PolicyDetails from '../components/PolicyDetails'
import { termAndCondition } from '../../../config/constants/policy'

function TermAndCondition() {
  return (
    <>
      <Section>
        <FlexDiv justifyContentCenter>
          <H2Heading>TERMS AND CONDITIONS</H2Heading>
        </FlexDiv>
        <PolicyDetails data={termAndCondition} />
      </Section>
    </>
  )
}

export default TermAndCondition
