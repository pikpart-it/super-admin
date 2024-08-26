import React from 'react'
import { FlexDiv, SubSection } from '../../../style/styled'
import { H2Heading, Span } from '../../../components/styled'
import { Section } from '../../../style/styled'
import { Heading, Description } from '../styled'

function CareerDetails() {
  return (
    <div style={{ width: '900px', margin: '0 auto', border: '1px solid black' }}>
      <Section>
        <FlexDiv justifyContentCenter>
          <H2Heading style={{ margin: '50px 0 20px 0' }}>Lead Developer</H2Heading>
        </FlexDiv>
        <FlexDiv justifyContentCenter style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: '14px' }}>posted 5 months back</div>
        </FlexDiv>
        <SubSection>
          <Heading variant="h3">Key Responsibilities</Heading>
          <Description>
            <Span>
              As a Lead Developer you will be part of the Development Team with the following tasks:
              Write, deliver code and participate in code walkthroughs according to the requirements
              of the functional specifications Develop or ensure code is at high standard and
              specification in accordance with the current framework Build strong collaborative
              relationships with architects, designers, UX experts. Assist as required in scope
              definition, technical viability scoping and best practice solution design to meet the
              requirements. Where appropriate, provide guidance to the Solution Architect in the
              development of solutions. Highlight all risks and issues that affect development or
              deliveries. Work across teams to define efficient solutions and implementation
              strategies to create highly cohesive implementation across products. Possibly mentor
              staff in the software development method; coding and testing techniques Demonstrate
              interest in improving the company’s technical awareness, depth, and use of technology
              across the business. Participate in the evolution of company level best practices,
              standards, and policies related to software development.
            </Span>
          </Description>
          <Heading variant="h3">Advantage If</Heading>
          <Description>
            <Span>
              Consumer Web Development Experience for High-Traffic, Public Facing web applications
              Experience with cloud technologies also a plus Knowledgeable in cloud-based document
              management products.
            </Span>
          </Description>
          <Heading variant="h3">Job Category</Heading>
          <Description>
            <Span>Mean Stack Developer</Span>
          </Description>
          <Heading variant="h3">Job Type</Heading>
          <Description>
            <Span>Full Time</Span>
          </Description>
          <Heading variant="h3">Job Location</Heading>
          <Description>
            <Span>Faridabad or Work From Home</Span>
          </Description>
        </SubSection>
      </Section>
    </div>
  )
}
export default CareerDetails
