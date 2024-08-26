import React from 'react'
import { SubSection } from '../../../style/styled'
import { Description, Heading } from '../styled'
import { Span } from '../../../components/styled'

function NewPolicyComponent({ data }) {
  return (
    <SubSection>
      {data.map((content: any, i: number) => (
        <div key={i}>
          {content.header ? <Heading variant="h3">{content.header}</Heading> : null}
          <Description>
            {content.description.map((item: string, i: number) => (
              <Span key={i}>{item}</Span>
            ))}
          </Description>
        </div>
      ))}
    </SubSection>
  )
}

export default NewPolicyComponent
