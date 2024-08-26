import React from 'react'
import { H2Heading } from '../../../components/styled'
import { FlexDiv, Section } from '../../../style/styled'
import PolicyDetails from '../components/PolicyDetails'
import { policies } from '../../../config/constants/policy'

function Policies() {
  return (
    <>
      <Section>
        <FlexDiv justifyContentCenter>
          <H2Heading>Privacy Policy</H2Heading>
        </FlexDiv>
        <PolicyDetails data={policies} />
      </Section>
    </>
  )
}

export default Policies
