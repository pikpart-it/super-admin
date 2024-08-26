import React from 'react'
import { H2Heading } from '../../../components/styled'
import { FlexDiv, Section } from '../../../style/styled'
import PolicyDetails from '../components/PolicyDetails'
import { conducts, values } from '../../../config/constants/policy'

function CodeAndValues() {
  return (
    <>
      <Section>
        <FlexDiv justifyContentCenter>
          <H2Heading>Code of Conduct</H2Heading>
        </FlexDiv>
        <PolicyDetails data={conducts} />
      </Section>
      <Section>
        <FlexDiv justifyContentCenter>
          <H2Heading>Values</H2Heading>
        </FlexDiv>
        <PolicyDetails data={values} />
      </Section>
    </>
  )
}

export default CodeAndValues
