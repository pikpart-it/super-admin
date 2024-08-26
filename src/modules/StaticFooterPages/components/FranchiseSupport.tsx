import React from 'react'
import { FranchiseSupportDocument } from '../../../config/constants/franchise'
import { FranchiseDescription } from '../styled'
import { SubSection } from '../../../style/styled'
import { Heading } from '../../StaticFooterPages/styled'
import { Span } from '../../../components/styled'

function FranchiseSupport() {
  return (
    <SubSection>
      {FranchiseSupportDocument.map((content: any, i: number) => {
        return (
          <div key={i}>
            <Heading variant="h3">{content.header}</Heading>
            <FranchiseDescription>
              {content.description.map((item: string, i: number) => (
                <Span key={i}>{item}</Span>
              ))}
            </FranchiseDescription>
          </div>
        )
      })}
    </SubSection>
  )
}

export default FranchiseSupport
