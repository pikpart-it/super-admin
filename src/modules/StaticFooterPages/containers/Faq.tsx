import React from 'react'
import { FlexDiv, Section, SubSection } from '../../../style/styled'
import { H2Heading, Span } from '../../../components/styled'
import { Heading, Description } from '../styled'
import { faq } from '../../../config/constants/faq'
function Faq() {
  return (
    <Section
      style={{
        padding: '0 2vmax 0 2vmax',
      }}>
      <FlexDiv justifyContentCenter>
        <H2Heading>FAQ</H2Heading>
      </FlexDiv>
      <SubSection style={{ paddingBottom: '40px' }}>
        {faq.map((content: any, i: number) => {
          return (
            <div key={i}>
              {content.question ? <Heading variant="h3">{content.question}</Heading> : null}
              <Description>
                {content.answer.map((item: string, i: number) => (
                  <Span key={i}>{item}</Span>
                ))}
              </Description>
            </div>
          )
        })}
      </SubSection>
    </Section>
  )
}
export default Faq
