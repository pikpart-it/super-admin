import React from 'react'
import { H2Heading } from '../../../components/styled'
import NewPolicyComponent from '../components/NewPolicyComponent'
import { FlexDiv, Section } from '../../../style/styled'
import { policies } from '../../../config/constants/policy'
function NewPolicy() {
  return (
    <Section>
      <FlexDiv justifyContentCenter>
        <H2Heading>Privacy Policy</H2Heading>
      </FlexDiv>
      <NewPolicyComponent data={policies} />
    </Section>
  )
}

export default NewPolicy
